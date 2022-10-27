@reservation
Feature: Reservation | Specific Cola Day Feature (mixed booking)

  Scenario: Employee at Pepsi can book a room from Coke on Cola Day
    Given I am employeeB at Coke
    And I select Cola Day in calendar
    When I book a new reservation for competitor room P06
    Then I get a confirmation for the reservation


  Scenario: Employee at Coke can book a room from Pepsi on Cola Day
    Given I am employeeA at Pepsi
    And I select Cola Day in calendar
    When I book a new reservation for competitor room C07
    Then I get a confirmation for the reservation

