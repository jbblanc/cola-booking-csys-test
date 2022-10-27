import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from '../account/model/account.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /*
  This Guard grants access to a valid token AND a token associated to a valid account
  It's the default Guard used by any received call which requires at minimum a valid authenticated account
  */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const account = await this.authService.checkIdentityAndRetrieveAccount(
      context,
    );
    if (!account) {
      return false; // no access token OR invalid access token OR invalid account
    }
    this.attachAccountToRequest(context, account);
    return true;
  }

  attachAccountToRequest(context: ExecutionContext, account: Account) {
    const request = context.switchToHttp().getRequest();
    request.account = account;
    request.accountId = account.id; //TODO keep this ? already in account just above
  }
}
