Feature: Get Specialist with API

  Scenario: Get Specialist
    Given the endpoint http://localhost:8080/specialist/{id} is available
    When a get specialist request is sent
    Then the result is success
