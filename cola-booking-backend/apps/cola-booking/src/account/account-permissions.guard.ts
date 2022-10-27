import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from '../commons/permissions';
import { AccountService } from './account.service';
import { Account } from './model/account.entity';

@Injectable()
export class AccountPermissionsGuard extends PermissionsGuard {
  constructor(private readonly accountService: AccountService) {
    super(new Reflector());
  }

  async accountCanHaveAccessToResource(
    params: any,
    account: Account,
  ): Promise<boolean> {
    const { accountId } = params; // Attention => doit matcher avec le nom du param dans la route du controller
    if (accountId) {
      return await this.accountResourceBelongsToUser(accountId, account);
    } else {
      return true;
    }
  }

  /*accountHasProperRoleForResource(user: any): boolean {
    return (
      user.role === AccountRole.EMPLOYER ||
      user.role === AccountRole.ADMIN
    );
  }*/

  private async accountResourceBelongsToUser(
    accountId: string,
    account: Account,
  ): Promise<boolean> {
    const resource = await this.accountService.findOne(accountId);
    return resource && resource.id === account.id;
  }
}
