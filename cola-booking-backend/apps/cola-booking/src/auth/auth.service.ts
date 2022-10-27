import {
  Injectable,
  UnauthorizedException,
  Inject,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { ValidAuthResponseDto } from './dto/valid-auth-response.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Account } from '../account/model/account.entity';
import { AccountRole, AccountService } from '../account';
import { EntityStatus, LogWarnType } from '@colabooking/commons';
import { Credentials } from '../account/model/credentials.embedded.entity';

export class NewPassword {
  password: string;
  salt: string;
}

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly rootLogger: Logger,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = this.rootLogger.child({ origin: AuthService.name });
  }

  async signUp(signUpDto: SignupDto): Promise<ValidAuthResponseDto> {
    const {
      lastName,
      firstName,
      companyId,
      email,
      password,
      jobPosition,
      hasAcceptedTerms,
      hasConsentedDataProcessing,
    } = signUpDto;
    const encryptedPassword = await this.encryptNewPassword(password);
    const credentials: Credentials = {
      password: encryptedPassword.password,
      salt: encryptedPassword.salt,
    };
    const newAccount = await this.accountService.create(
      {
        profile: {
          lastName,
          firstName,
          email,
          jobPosition,
          avatarUrl: 'https://i.pravatar.cc/150',
        },
        companyId,
        roles: [AccountRole.EMPLOYEE],
        hasAcceptedTerms,
        hasConsentedDataProcessing,
        credentials,
      },
      'new-user',
    );

    this.logger.info('Signup completed', {
      account: { id: newAccount.id },
    });
    return this.generateValidAuthResponse(newAccount);
  }

  async logIn(dto: LoginDto): Promise<ValidAuthResponseDto> {
    let account = await this.accountService.findOneFromEmailWithCredentials(
      dto.email,
    );
    if (
      !account ||
      account.status !== EntityStatus.ACTIVE ||
      !(await bcrypt.compare(dto.password, account.credentials.password))
    ) {
      this.logger.warn(
        'Access denied' + !account
          ? ' (unknown or inactive login: ' + dto.email + ')'
          : null,
        account ? { account: { id: account.id } } : null,
      );
      throw new UnauthorizedException('Access denied');
    }
    this.logger.info('Login granted', {
      account: { id: account.id },
    });
    return this.generateValidAuthResponse(account);
  }

  private async encryptNewPassword(newPassword: string): Promise<NewPassword> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);
    return {
      password,
      salt,
    };
  }

  async checkIdentityAndRetrieveAccount(
    context: ExecutionContext,
  ): Promise<Account | null> {
    let token = await this.checkAndRetrieveToken(context);
    if (!token) {
      return null;
    }
    const account = await this.accountService.findOne(token.id);
    return account;
  }

  async checkAndRetrieveToken(context: ExecutionContext): Promise<any | null> {
    const rawToken = this.extractBearerTokenFromHeaders(context);
    if (!rawToken) {
      this.logger.warn(
        'No authorization token attached with request while expecting one',
        {
          warn: LogWarnType.SECURITY,
          request: this.extractRequestInfoFromContext(context),
        },
      );
      return null;
    }
    try {
      return await this.jwtService.verifyAsync(rawToken);
    } catch (error) {
      this.logger.warn('Invalid authorization token attached with request', {
        warn: LogWarnType.SECURITY,
        request: this.extractRequestInfoFromContext(context),
        details: error,
      });
      return null;
    }
  }

  private extractBearerTokenFromHeaders(
    context: ExecutionContext,
  ): string | undefined {
    const request = context.switchToHttp().getRequest();
    if (
      !request.headers.authorization ||
      request.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
      return null;
    }
    return request.headers.authorization.replace('Bearer ', '');
  }

  private extractRequestInfoFromContext(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    return (
      request.method + ' ' + request.url + ' started on ' + request._startTime
    );
  }

  async blockIfUserAlreadyExists(emailToMatch: string) {
    const account = await this.accountService.findOneFromEmailWithCredentials(
      emailToMatch,
    );
    if (account) {
      this.logger.warn(
        'Signup attempt with an already used login was rejected (targeted account: ' +
          account.id +
          ')',
      );
      throw new UnauthorizedException('Account already exists');
    }
  }

  private async generateValidAuthResponse(
    account: Account,
  ): Promise<ValidAuthResponseDto> {
    const token = await this.forgeAccessToken(account);
    return {
      token,
      token_type: 'bearer',
      expires_on: Date.now() + 2 * 24 * 3600 * 1000,// now + 2days
      account: this.accountService.filterUserSensitiveData(account),
    };
  }

  private async forgeAccessToken(account: Account): Promise<string> {
    const { id } = account;
    const access_token = await this.jwtService.sign({ id });
    return access_token;
  }


  //TODO implement this
  async disconnect() {
    return {};
  }
}
