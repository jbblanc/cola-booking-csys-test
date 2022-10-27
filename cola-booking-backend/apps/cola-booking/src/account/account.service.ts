import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Account } from './model/account.entity';
import { AccountRole } from './model/account-role.enum';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LogWarnType, EntityStatus } from '../../../../libs/commons/src/model';
import { Gender } from './model/gender.enum';
import { AccountEventLogger } from './account.event-logger';

@Injectable()
export class AccountService {
  private logger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly rootLogger: Logger,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly eventLogger: AccountEventLogger,
  ) {
    this.logger = this.rootLogger.child({ origin: AccountService.name });
  }

  async create(
    partialAccount: DeepPartial<Account>,
    by: string,
  ): Promise<Account> {
    const account = this.accountRepository.create(partialAccount);
    await account.save();
    this.eventLogger.newEvent('New account created', by, account, null);
    return account;
  }

  async update(id: string, dto: UpdateAccountDto, by: string): Promise<Account> {
    await this.accountRepository.update(id, dto);
    this.eventLogger.newEventBasic('Account updated', by, id, dto);
    return this.findOne(id);
  }

  async findOne(id: string): Promise<Account> {
    return this.accountRepository.findOne(id);
  }

  async findOneFromAuthenticationId(
    authenticationId: string,
  ): Promise<Account> {
    return this.accountRepository.findOne({
      where: {
        authenticationId: authenticationId,
        status: EntityStatus.ACTIVE,
      },
    });
  }

  async findOneFromEmailWithCredentials(loginEmail: string): Promise<Account> {
    return await this.findOneFromEmail(loginEmail);
  }

  async findOneFromEmail(email: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: {
        profile: {
          email: email,
        },
        status: EntityStatus.ACTIVE,
      },
    });
  }

  async findAll(): Promise<Account[]> {
    //TODO pagination à prévoir assez rapidement
    return await this.accountRepository
      .createQueryBuilder('acc')
      .orderBy('acc.profile.lastName', 'ASC')
      .addOrderBy('acc.profile.firstName', 'ASC')
      .getMany();
  }

  async delete(id: string, by: string): Promise<void> {
    /*
    //TODO => Ajouter un mécanisme d'anonymisation des données 
    (pas synchrone, peut attendre qq jours en cas de demande de restore, mais par ex. un batch qui rammasse tous les comptes à anonymiser)
    */
    await this.accountRepository.update(id, {
      status: EntityStatus.DELETED,
    });
    this.eventLogger.newEventBasic('Account deleted', by, id, null);
  }

  async suspend(id: string, by: string): Promise<void> {
    await this.accountRepository.update(id, {
      status: EntityStatus.SUSPENDED,
    });
    this.eventLogger.newEventBasic('Account suspended', by, id, null);
  }

  async restore(id: string, by: string): Promise<Account> {
    await this.accountRepository.update(id, {
      status: EntityStatus.ACTIVE,
    });
    this.eventLogger.newEventBasic('Account restored', by, id, null);
    // since we reactivate the item, it makes sense to return it to requester
    return this.findOne(id);
  }

  async trash(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async registerNewAccountFromAuthToken(token: any) {
    if (!token) {
      throw new UnauthorizedException('Aucune information de compte');
    }
    this.logger.info('Registering new account', {
      account: { authenticationId: token.sub },
    });
    // check if same user already exists => authenticationId ET email
    let account = await this.findOneFromAuthenticationId(token.sub);
    if (account) {
      this.logger.warn(
        'Attempt to register new account while this account already exists',
        {
          warn: LogWarnType.SECURITY,
          account: { authenticationId: token.sub },
        },
      );
      throw new UnauthorizedException(
        'Impossible de créer un compte pour ' + token.sub,
      ); // user already registered
    }
    account = await this.findOneFromEmail(token.email);
    if (account) {
      this.logger.warn(
        'Attempt to register new account while this account already exists',
        {
          warn: LogWarnType.SECURITY,
          account: { authenticationId: token.sub },
        },
      );
      throw new UnauthorizedException(
        'Impossible de créer un compte pour ' + token.sub,
      ); // user already registered
    }
    // "first time" identifiers, new account registration
    account = await this.create(this.mapInitialAccountFromToken(token), null);
    this.eventLogger.newEvent('New account registered', null, account, {
      account: { authenticationId: token.sub },
    });
    return account;
  }

  private mapInitialAccountFromToken(token: any): any {
    return {
      authenticationId: token.sub,
      isEmailVerified: token.email_verified,
      roles: [AccountRole.GUEST],
      profile: {
        email: token.email,
        lastName: token.family_name,
        firstName: token.given_name,
        avatarUrl: token.picture,
        gender: Gender.UNDEFINED,
      },
    };
  }

  // TODO find a better solution to filter fields in user
  filterUserSensitiveData(account: Account) {
    account.credentials = null;
    return account;
  }
}
