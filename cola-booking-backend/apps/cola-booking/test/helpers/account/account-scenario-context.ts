import { ScenarioBaseContext } from '../scenario-base-context';
import { Account } from '../../../src/account/model/account.entity';

export class AccountScenarioContext extends ScenarioBaseContext {
  public accountResource: Account;
  public accountsList: Account[];


  constructor() {
    super();
  }

  public reset() {
    super.reset();
    console.log('clearing account scenario context');
    this.accountResource = null;
    this.accountsList = null;
    // ...
  }
}
