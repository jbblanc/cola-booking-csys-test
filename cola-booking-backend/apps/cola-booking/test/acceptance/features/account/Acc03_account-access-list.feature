@account @long-running
Feature: Account | Validating route access

  Scenario Outline: Consulting accounts list
    Given I am <ROLE>
    Then I can't consult accounts list - Code <HTTP>

    Examples:
      | ROLE               | HTTP |
      | employeeB at Pepsi | 403  |
      | employeeA at Coke  | 403  |

