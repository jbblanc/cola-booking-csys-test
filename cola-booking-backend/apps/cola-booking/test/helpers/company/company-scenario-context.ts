import { ScenarioBaseContext } from '../scenario-base-context';
import { Company } from '../../../src/company/model/company.entity';
import { CreateCompanyDto } from '../../../src/company/dto/create-company.dto';
import { UpdateCompanyDto } from '../../../src/company/dto/update-company.dto';

export class CompanyScenarioContext extends ScenarioBaseContext {
  public companyResource: Company;
  public createCompanyDto: CreateCompanyDto;
  public updateCompanyDto: UpdateCompanyDto;
  public companiesList: Company[];
  public companyIdsToTrash: string[] = [];

  constructor() {
    super();
  }

  public reset() {
    super.reset();
    this.companyResource = null;
    this.createCompanyDto = null;
    this.updateCompanyDto = null;
    this.companiesList = null;
    this.companyIdsToTrash = [];
    // ...
  }
}
