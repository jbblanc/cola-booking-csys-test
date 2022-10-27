@account
Feature: Account | Connection & consultation

  Scenario: Consulting my account details
    Given I am employeeB at Pepsi
    When I get access to my account
    Then I can consult my account details

  Scenario: Consulting my account details
    Given I am employeeA at Coke
    When I get access to my account
    Then I can consult my account details

  Scenario Outline: Consulting my account details
    Given I am <ROLE>
    When I get access to my account
    Then I can consult my account details showing <LAST_NAME> and <FIRST_NAME>

    Examples:
      | ROLE               | LAST_NAME     | FIRST_NAME |
      | admin              | Runolfsdottir | Kolby      |
      | employeeA at Coke  | Langworth     | Vinnie     |
      | employeeB at Coke  | Connelly      | Harmony    |
      | employeeA at Pepsi | Homenick      | Barry      |
      | employeeB at Pepsi | Moore         | Angus      |

