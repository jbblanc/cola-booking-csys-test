import { ScenarioBaseContext } from '../scenario-base-context';

export class MonitoringScenarioContext extends ScenarioBaseContext {
  public monitoringStatus: any;

  constructor() {
    super();
  }

  public reset() {
    super.reset();
    this.monitoringStatus = null;
    // ...
  }
}
