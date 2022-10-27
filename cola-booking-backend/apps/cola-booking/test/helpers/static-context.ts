import { AuthenticatedAccount } from './authentication';
//**********
//CAUTION: This structure must be used with care (and as a last chance) to share data among tests
//**********
// GLOBAL CONTEXT in memory during ALL scenarios execution (static)
// Use it only if your reach limitations using ScenarioBaseContext derived classes

export class StaticContext {
  // allows each 'steps' class to get the actual authenticated account
  public static loggedAccount: AuthenticatedAccount = null;
}
