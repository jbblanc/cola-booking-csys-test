@monitoring
Feature: Monitoring | Status

  Scenario: Requesting API health
    Given An external client system
    When The system is asking for api health
    Then Api health status is OK