import 'dotenv/config';
import {
  Credentials,
  AuthenticatedAccount,
  authenticateAccount,
} from './authentication';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export interface TestAccount {
  roleKey: string;
  credentials: Credentials;
  activeAuthentication?: AuthenticatedAccount;
}

export const invalidToken: string =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJiNlNSSi12eDRkc3gxME04WExqeSJ9.eyJpc3MiOiJodHRwczovL2FwcGFyZWxvLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MGFlYWRhZmYzNjNmYzAwNjk1NjBiYmMiLCJhdWQiOiJodHRwczovL3Rlc3RhcGkuYXBwYXJlbG8uY29tIiwiaWF0IjoxNjIyMjIxMDYyLCJleHAiOjE2MjIzMDc0NjIsImF6cCI6ImlKaU9rYVI5VlJaM1NtZnoxZWwyRmt5QkhZVDFSWmttIiwiZ3R5IjoicGFzc3dvcmQifQ.AH86IXUlGpifyv_9U0x4PGlLZgJfD_Gwn_Ityu94KJfkvoIBSzwv3P6pFsusBSixxNjht7ugD2A6ig3E9gWBwozTGJnapGCXab2FQR__76mYX7dncMrGVc3OTxVs9ed__Y2lHBmbgg4xD_U8viwiN3EiwD76X-tQ4GvsoMKZdBbgPdrYt7lyzzK6Dw3uJjJS-FPNlk4VLEV_2p8x6R4d5iN22jw6x0w_xakUtMWgbWbC-UxUTEcgOtb-so_pIuPCtB6xrzKqz5XS0PGr0N1jEilqZeP5ULzuk-1G8khzZPbm7heDl4-kQRRiZ_V4DMAKgCmwh3B0ckk0b4Xn3shXjA';

// This file will store actual pool content, to avoid (re)login for each test intraday and save precious time
const poolStoreFile: string = 'test-accounts-pool.json';

export class AccountPool {
  private testAccounts: TestAccount[];

  constructor() {
    this.load();
  }

  private load() {
    if (existsSync(poolStoreFile)) {
      const store = readFileSync(poolStoreFile, 'utf-8');
      if (store && store.length > 0) {
        this.testAccounts = JSON.parse(store);
        return;
      }
    }
    this.testAccounts = this.defaulTestAccounts();
  }

  private save() {
    const poolContent: string = JSON.stringify(this.testAccounts);
    writeFileSync(poolStoreFile, poolContent, {
      encoding: 'utf-8',
    });
  }

  public async accountFromRoleAndCompany(
    roleAndCompany: string,
  ): Promise<AuthenticatedAccount> {
    // receiving "admin" OR "employeeB at Pepsi"
    roleAndCompany = roleAndCompany.toLowerCase().replace(' at ', '-');
    return await this.getOrAuthenticateAccount(
      this.getTestAccount(roleAndCompany),
    );
  }

  private getTestAccount(roleKey: string): TestAccount {
    const match = this.testAccounts.filter((a) => a.roleKey === roleKey);
    if (match) {
      return match[0];
    } else {
      console.log('NO account defined for this definition' + roleKey);
      return null;
    }
  }

  private async getOrAuthenticateAccount(
    testAccount: TestAccount,
  ): Promise<AuthenticatedAccount> {
    // if account has already been authenticated, and token is still valid, using temp cache instead of calling authent again
    if (!this.isAuthenticationValid(testAccount.activeAuthentication)) {
      const newAuthenticatedAccount = await authenticateAccount(
        testAccount.credentials,
      );
      testAccount.activeAuthentication = newAuthenticatedAccount; // updating cache for potential next calls
      this.save();
    }
    return testAccount.activeAuthentication;
  }

  private isAuthenticationValid(
    activeAuthentication: AuthenticatedAccount,
  ): boolean {
    //FIXME ajout check sur expiration_token, avec marge de qq minutes pour invalider
    if (
      activeAuthentication &&
      activeAuthentication.auth &&
      activeAuthentication.auth.access_token &&
      activeAuthentication.auth.expires_on > Date.now() + 120 * 60 * 1000 // marge de 2h
    ) {
      return true;
    }
    return false;
  }

  private defaulTestAccounts(): TestAccount[] {
    return [
      {
        roleKey: 'admin',
        credentials: {
          email: 'admin@colacorp.com',
          password: process.env.TEST_ACCOUNT_PASSWORD,
        },
        activeAuthentication: null,
      },
      {
        roleKey: 'employeea-coke',
        credentials: {
          email: 'employee_a@coke.com',
          password: process.env.TEST_ACCOUNT_PASSWORD,
        },
        activeAuthentication: null,
      },
      {
        roleKey: 'employeeb-coke',
        credentials: {
          email: 'employee_b@coke.com',
          password: process.env.TEST_ACCOUNT_PASSWORD,
        },
        activeAuthentication: null,
      },
      {
        roleKey: 'employeea-pepsi',
        credentials: {
          email: 'employee_a@pepsi.com',
          password: process.env.TEST_ACCOUNT_PASSWORD,
        },
        activeAuthentication: null,
      },
      {
        roleKey: 'employeeb-pepsi',
        credentials: {
          email: 'employee_b@pepsi.com',
          password: process.env.TEST_ACCOUNT_PASSWORD,
        },
        activeAuthentication: null,
      },
    ];
  }
}
