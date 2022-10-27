import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import { expect, assert } from 'chai';
import { Account } from '../../../src/account/model/account.entity';
import {
  accounts_getMine,
  accounts_getAll,
} from '../../helpers/account/account';
import { AccountScenarioContext } from '../../helpers/account/account-scenario-context';
import { EntityStatus } from '../../../../../libs/commons/src/model/entity-status.enum';
import { StaticContext } from '../../helpers/static-context';

@binding([AccountScenarioContext])
export class AccountSteps {
  constructor(protected accountScenario: AccountScenarioContext) {}

  @before('@account')
  public runsBeforeEachScenarioFirstStep() {
    //console.log('============ BEFORE @account TAGGED TESTS only ==========');
  }

  @after('@account')
  public runsAfterEachScenarioLastStep() {
    //console.log('============ AFTER @account TAGGED TESTS only ==========');
  }

  @when(/I get access to my account/)
  public async requestOwnAccount() {
    const mine: Account = await accounts_getMine(
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(mine).to.be.not.null;
    this.accountScenario.accountResource = mine;
  }

  @when(/I request the full list of accounts/)
  public async requestAllAccounts() {
    const allAccounts: Account[] = await accounts_getAll(
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(allAccounts).to.be.not.null;
    this.accountScenario.accountsList = allAccounts;
  }

  @then(/I can consult my account details/)
  public validateReturnedAccount() {
    const account = this.accountScenario.accountResource;
    expect(account.id).to.be.not.null;
    expect(account.status).to.equal(EntityStatus.ACTIVE);
    //expect(account.profile.lastName).to.equal('COMMERCIAL');
    expect(account.profile.firstName).to.be.not.null;
  }

  @then(/I can consult my account details showing ([^"]*) and ([^"]*) /)
  public validateReturnedAccounts(lastName: string, firstName: string) {
    const account = this.accountScenario.accountResource;
    expect(account.id).to.be.not.null;
    expect(account.status).to.equal(EntityStatus.ACTIVE);
    expect(account.profile.lastName).to.equal(lastName);
    expect(account.profile.firstName).to.equal(firstName);
  }

  @then(/I can consult the full list of accounts/)
  public canAccessAllAccounts() {
    const allAccounts = this.accountScenario.accountsList;
    expect(allAccounts).to.be.not.null;
    expect(allAccounts).to.be.not.empty;
  }

  @then(
    /I can't consult accounts list - Code ([^"]*)/,
  )
  public async accessForbiddenAllAccounts(httpCode: string) {
    try {
      await accounts_getAll(StaticContext.loggedAccount.auth.access_token);
      assert.fail('Shoud not be allowed !');
    } catch (e) {
      expect(e.message).to.equal(httpCode);
    }
  }
}
