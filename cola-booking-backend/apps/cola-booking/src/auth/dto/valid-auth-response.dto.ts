import { Account } from '../../account/model/account.entity';

export class ValidAuthResponseDto {
  token: string;

  token_type: string;

  expires_on: number; // nb of seconds

  // TODO ensure that credentials are never sent along with account
  account: Account;
}
