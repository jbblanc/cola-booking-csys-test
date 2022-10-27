@room
Feature: Room | CRUD management

  Scenario: Referencing & Consulting a new room for company
    Given I am admin
    When I reference a new room X123 for Pepsi
    Then I can consult details about the room

  Scenario: Udapting a referenced room
    Given I am admin
    And I reference a new room Z345 for Coke
    When I update information about the room
    Then Changes are properly saved on room

  Scenario: Getting the list of rooms
    Given I am employeeA at Pepsi
    When I request my list of rooms
    Then I have access to rooms from my company only

  Scenario: Getting the list of rooms
    Given I am employeeA at Coke
    When I request my list of rooms
    Then I have access to rooms from my company only




