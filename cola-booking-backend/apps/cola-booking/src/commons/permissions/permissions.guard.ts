import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsAccountScopes } from './permissions-account-scopes';
import { Permission } from './permission.enum';
import { Account } from '../../account/model/account.entity';
import { AccountRole } from '../../account';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const account = context.getArgs()[0].account as Account;

    const routePermissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );
    if (
      !routePermissions ||
      (account.roles && account.roles.includes(AccountRole.ADMIN))
    ) {
      return true; // "Public" route OR ADMIN account => OK, granted in any situation
    }

    return (
      this.accountMatchesControllerPermissions(
        account.roles,
        routePermissions,
      ) && this.accountCanAccessRequestedResource(request.params, account)
    );
  }

  private accountMatchesControllerPermissions(
    roles: AccountRole[],
    routePermissions: Permission[],
  ): boolean {
    let accountPermissionsAccordingToItsRole: Permission[] = [];
    roles.forEach((role) => {
      if (PermissionsAccountScopes[role]) {
        PermissionsAccountScopes[role].map((rolePerm) => {
          accountPermissionsAccordingToItsRole.push(rolePerm);
        });
      }
    });
    return routePermissions.every((routePermission) =>
      accountPermissionsAccordingToItsRole.includes(routePermission),
    );
  }

  async accountCanAccessRequestedResource(
    params: any,
    account: Account,
  ): Promise<boolean> {
    let accountCanHaveAccessToThisResource: boolean = false;
    accountCanHaveAccessToThisResource = await this.accountCanHaveAccessToResource(
      params,
      account,
    );
    return accountCanHaveAccessToThisResource;
  }

  async accountCanHaveAccessToResource(
    params: any,
    account: Account,
  ): Promise<boolean> {
    return true;
  }

}
