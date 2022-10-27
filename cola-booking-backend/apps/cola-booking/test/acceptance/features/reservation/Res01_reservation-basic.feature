@reservation
Feature: Reservation | Base features

  Scenario: Booking a new reservation on a specific room
    Given I am employeeB at Coke
    When I book a new reservation for room C03
    Then I get a confirmation for the reservation

  Scenario: Cancelling my reservation
    Given I am employeeA at Pepsi
    And I book a new reservation for room P07
    When I cancel the reservation
    Then The reservation is properly cancelled

  Scenario: Booking a new reservation on a room from competitor company
    Given I am employeeB at Coke
    When I book a new reservation for competitor room P01
    Then My reservation request is rejected

  Scenario: Booking a new reservation on a room from competitor company
    Given I am employeeA at Pepsi
    When I book a new reservation for competitor room C04
    Then My reservation request is rejected

  Scenario: Booking a new reservation on a room that's already booled by someone else
    Given I am employeeA at Pepsi
    And Room P05 is already booked
    When I book a new reservation for already booked room P05
    Then My reservation request is rejected




