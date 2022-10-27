import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import { expect, assert } from 'chai';

import { CompanyScenarioContext } from '../../helpers/company/company-scenario-context';
import {
  companies_create,
  companies_update,
  companies_getOne,
  companies_trashOne,
} from '../../helpers/company/company';
import { Company } from '../../../src/company/model/company.entity';
import { StaticContext } from '../../helpers/static-context';
import { EntityStatus } from '../../../../../libs/commons/src/model/entity-status.enum';
import { AccountPool } from '../../helpers/account-pool';

@binding([CompanyScenarioContext, AccountPool])
export class CompanySteps {
  constructor(protected companyScenario: CompanyScenarioContext, protected accountPool: AccountPool) {}

  @after('@company')
  public async runsAfterEachScenarioLastStep() {
    // purging all resources created during the test
    StaticContext.loggedAccount = await this.accountPool.accountFromRoleAndCompany('admin');
    for (let id of this.companyScenario.companyIdsToTrash) {
      await companies_trashOne(
        id,
        StaticContext.loggedAccount.auth.access_token,
      );
    }
  }

  @when(/I reference a new company ([^"]*)/)
  public async createNewCompany(name: string) {
    this.companyScenario.createCompanyDto = {
      name,
    };
    const company: Company = await companies_create(
      this.companyScenario.createCompanyDto,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.companyScenario.companyResource = company;
    this.companyScenario.companyIdsToTrash.push(company.id);
    expect(company).to.be.not.null;
    expect(company.id).to.be.not.null;
    expect(company.createdOn).to.be.not.null;
    expect(company.status).to.equal(EntityStatus.ACTIVE);
    expect(company.name).to.equal(this.companyScenario.createCompanyDto.name);
  }

  @when(/I update information about the company/)
  public async updateShop() {
    let company: Company = await companies_getOne(
      this.companyScenario.companyResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.companyScenario.updateCompanyDto = { name: 'new name for company' };
    company = await companies_update(
      company.id,
      this.companyScenario.updateCompanyDto,
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(company).to.be.not.null;
    this.companyScenario.companyResource = company;
    expect(company.name).to.equal(this.companyScenario.updateCompanyDto.name);
  }

  @then(/I can consult details about the company/)
  public async consultOneShop() {
    const company: Company = await companies_getOne(
      this.companyScenario.companyResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(company).to.be.not.null;
    expect(company.id).to.equal(this.companyScenario.companyResource.id);
  }

  @then(/Changes are properly saved on company/)
  public async checkShopUpdate() {
    expect(this.companyScenario.companyResource.name).to.equal(
      this.companyScenario.updateCompanyDto.name,
    );
  }
}
