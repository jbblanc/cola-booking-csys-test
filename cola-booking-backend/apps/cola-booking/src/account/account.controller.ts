import { AccountService } from './account.service';
import { AuthGuard } from '../auth/auth.guard';
//import { AuthService } from './auth.service';
import { AccountPermissionsGuard } from './account-permissions.guard';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetAccount } from './get-account.decorator';
import { Account } from './model/account.entity';
import { Permission, Permissions } from '../commons/permissions';
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

@ApiTags('Accounts')
@Controller('api/v1/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AccountPermissionsGuard)
  @Permissions(Permission.ACCOUNT_UPDATE_OWN)
  @Patch(':accountId')
  async updateAccount(
    @Param('accountId') id: string,
    @Body() dto: UpdateAccountDto,
    @GetAccount() by: Account,
  ): Promise<Account> {
    return await this.accountService.update(id, dto, by.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AccountPermissionsGuard)
  @Permissions(Permission.ACCOUNT_GET_OWN)
  @Get('mine')
  async getAccountFromAuthenticationId(
    @GetAccount() account: Account,
  ): Promise<Account> {
    return account; // account is already available after token decoding (by Guard)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AccountPermissionsGuard)
  @Permissions(Permission.ACCOUNT_GET_OWN)
  @Get(':accountId')
  async getAccount(@Param('accountId') id: string): Promise<Account> {
    return await this.accountService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AccountPermissionsGuard)
  @Permissions(Permission.ACCOUNT_GET)
  @Get()
  async getAllAccounts(): Promise<Account[]> {
    return await this.accountService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AccountPermissionsGuard)
  @Permissions(Permission.ACCOUNT_DELETE_OWN)
  @Delete('accounts/:accountId')
  async delete(
    @Param('accountId') id: string,
    @GetAccount() by: Account,
  ): Promise<void> {
    await this.accountService.delete(id, by.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Permissions(Permission.ACCOUNT_SUSPEND_OWN)
  @Post(':accountId/suspend')
  async suspend(
    @Param('accountId') id: string,
    @GetAccount() by: Account,
  ): Promise<void> {
    await this.accountService.suspend(id, by.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Permissions(Permission.ACCOUNT_RESTORE_OWN)
  @Post(':accountId/restore')
  async restore(
    @Param('accountId') id: string,
    @GetAccount() by: Account,
  ): Promise<Account> {
    return await this.accountService.restore(id, by.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AccountPermissionsGuard)
  @Permissions(Permission.ACCOUNT_TRASH)
  @Delete(':id/trash')
  async trash(@Param('id') id: string): Promise<void> {
    return this.accountService.trash(id);
  }
}
