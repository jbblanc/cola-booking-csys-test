import { v4 as uuid } from 'uuid';

export class ScenarioBaseContext {
  
  public id: string;
  
  constructor() {
    this.reset();
  }

  public reset() {
    this.id = uuid();
  }
}