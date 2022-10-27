import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { AccountPool } from '../../helpers/account-pool';
import { StaticContext } from '../../helpers/static-context';

@binding([AccountPool])
export class GlobalSteps {
  constructor(protected accountPool: AccountPool) {}

  @before()
  public runsBeforeEachScenarioFirstStep() {
    StaticContext.loggedAccount = null;
  }

  @given(/I am ([^"]*)/)
  public async logUser(role: string) {
    StaticContext.loggedAccount = await this.accountPool.accountFromRoleAndCompany(role);
    expect(StaticContext.loggedAccount.auth.access_token).to.be.not.null;
  }
}
