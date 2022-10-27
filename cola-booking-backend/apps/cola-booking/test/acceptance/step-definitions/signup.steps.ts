import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import { expect, assert } from 'chai';
import { StaticContext } from '../../helpers/static-context';
import { SignupScenarioContext } from '../../helpers/signup/signup-scenario-context';
import { AccountPool } from '../../helpers/account-pool';
import { companies_getOneFromName } from '../../helpers/company/company';
import { accounts_trashOne } from '../../helpers/account/account';
import { signup_signup } from '../../helpers/signup/signup';
import { ValidAuthResponseDto } from '../../../src/auth/dto/valid-auth-response.dto';

@binding([SignupScenarioContext, AccountPool])
export class SignupSteps {
  constructor(
    protected signupScenario: SignupScenarioContext,
    protected accountPool: AccountPool,
  ) {}

  @before('@signup')
  public runsBeforeEachScenarioFirstStep() {
    //console.log('============ BEFORE @signup TAGGED TESTS only ==========');
  }

  @after('@signup')
  public async runsAfterEachScenarioLastStep() {
    //console.log('============ AFTER @signup TAGGED TESTS only ==========');
    // purging all resources created during the test
    if (this.signupScenario.authenticatedAccount) {
      StaticContext.loggedAccount =
        await this.accountPool.accountFromRoleAndCompany('admin');
      await accounts_trashOne(
        this.signupScenario.authenticatedAccount.account.id,
        StaticContext.loggedAccount.auth.access_token,
      );
    }
  }

  @given(/As an unidentified user/)
  public async resetLoggedAccount() {
    StaticContext.loggedAccount = null;
  }

  @given(/I set my signup information at ([^"]*)/)
  public async createAndFillSignupDto(companyName: string) {
    const company = await companies_getOneFromName(
      companyName,
      await (
        await this.accountPool.accountFromRoleAndCompany('admin')
      ).auth.access_token,
    );
    this.signupScenario.signupDto = {
      firstName: 'Jon',
      lastName: 'Snow',
      companyId: company.id,
      email: `jon.snow@${companyName.toLowerCase()}.com`,
      jobPosition: 'Night Watcher',
      password: process.env.TEST_ACCOUNT_PASSWORD,
      hasAcceptedTerms: true,
      hasConsentedDataProcessing: true,
    };
  }

  @when(/I validate signup/)
  public async signup() {
    const resp: ValidAuthResponseDto = await signup_signup(
      this.signupScenario.signupDto,
    );
    this.signupScenario.authenticatedAccount = {
      auth: {
        access_token: resp.token,
        expires_on: resp.expires_on,
      },
      account: resp.account,
    };
  }

  @then(/I get authenticated/)
  public async checkAuthentication() {
    expect(this.signupScenario.authenticatedAccount).to.be.not.null;
    expect(this.signupScenario.authenticatedAccount.auth.access_token).to.be.not
      .null;
  }

  @then(/My account is created/)
  public async checkAccountCreation() {
    const account = this.signupScenario.authenticatedAccount.account;
    expect(account).to.be.not.null;
    expect(account.profile.firstName).to.equal(
      this.signupScenario.signupDto.firstName,
    );
    expect(account.profile.lastName).to.equal(
      this.signupScenario.signupDto.lastName,
    );
    expect(account.profile.jobPosition).to.equal(
      this.signupScenario.signupDto.jobPosition,
    );
    expect(account.profile.email).to.equal(this.signupScenario.signupDto.email);
    expect(account.companyId).to.equal(this.signupScenario.signupDto.companyId);
  }

  @then(/My account role is EMPLOYEE/)
  public async checkAccountRole() {
    const account = this.signupScenario.authenticatedAccount.account;
    expect(account.roles.length).to.equal(1);
    expect(account.roles[0]).to.equal('1');
  }
}
