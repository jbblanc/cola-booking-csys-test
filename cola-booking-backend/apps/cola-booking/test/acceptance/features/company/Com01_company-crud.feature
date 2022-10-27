@company
Feature: Company | CRUD management

  Scenario: Referencing & Consulting a new company
    Given I am admin
    When I reference a new company Orangina
    Then I can consult details about the company


  Scenario: Udapting a referenced company
    Given I am admin
    And I reference a new company Mountain Dew
    When I update information about the company 
    Then Changes are properly saved on company


  

  
