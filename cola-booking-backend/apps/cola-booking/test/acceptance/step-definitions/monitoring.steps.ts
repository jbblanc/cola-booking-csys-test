import { binding, given, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { monitoring_getHealth } from '../../helpers/monitoring/monitoring';
import { AccountPool } from '../../helpers/account-pool';
import { MonitoringScenarioContext } from '../../helpers/monitoring/monitoring-scenario-context';
import { StaticContext } from '../../helpers/static-context';

@binding([AccountPool, MonitoringScenarioContext])
export class MonitoringSteps {
  constructor(
    protected accountPool: AccountPool,
    protected monitoringScenario: MonitoringScenarioContext,
  ) {}

  @given(/An external client system/, '@monitoring')
  public async anyPublicSystem() {
    expect(StaticContext.loggedAccount).to.be.null;
  }

  @when(/The system is asking for api health/)
  public async callHealth() {
    const health: any = await monitoring_getHealth();
    expect(health).to.be.not.null;
    this.monitoringScenario.monitoringStatus = health;
  }

  @then(/Api health status is ([^"]*)/)
  public validateHealthStatus(status: string) {
    expect(this.monitoringScenario.monitoringStatus.status).to.equal(status);
  }
}
