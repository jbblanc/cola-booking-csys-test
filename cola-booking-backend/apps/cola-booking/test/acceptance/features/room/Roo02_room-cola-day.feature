@room
Feature: Room | Cola Day specific features

  Scenario: Getting the list of rooms for Cola Day (mixed selection)
    Given I am employeeB at Coke
    And I select Cola Day in calendar
    When I request my list of rooms
    Then I have access to rooms from both Pepsi and Coke


  Scenario: Getting the list of rooms for Cola Day (mixed selection)
    Given I am employeeA at Pepsi
    And I select Cola Day in calendar
    When I request my list of rooms
    Then I have access to rooms from both Pepsi and Coke





