@account @admin
Feature: Account | Accounts Admin mangement

  Scenario: Consulting accounts list
    Given I am admin
    When I request the full list of accounts
    Then I can consult the full list of accounts



