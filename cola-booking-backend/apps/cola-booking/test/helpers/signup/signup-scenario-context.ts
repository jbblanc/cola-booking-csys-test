import { ScenarioBaseContext } from '../scenario-base-context';
import { SignupDto } from '../../../src/auth/dto';
import { AuthenticatedAccount } from '../authentication';

export class SignupScenarioContext extends ScenarioBaseContext {
  public signupDto: SignupDto;
  public authenticatedAccount: AuthenticatedAccount;

  constructor() {
    super();
  }

  public reset() {
    super.reset();
    console.log('clearing signup scenario context');
    this.signupDto = null;
    this.authenticatedAccount = null;
    // ...
  }
}
