@signup
Feature: Signup/Registration | Standard features

  Scenario Outline: New user signup and account creation
    Given As an unidentified user
    And I set my signup information at <COMPANY>
    When I validate signup
    Then I get authenticated
    And My account is created
    And My account role is EMPLOYEE

    Examples:
      | COMPANY |
      | Pepsi   |
      | Coke    |