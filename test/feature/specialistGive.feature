Feature: Give Specialist with API

  Scenario: Give Specialist
    Given the endpoint http://localhost:8080/specialist is available
    When save an specialist, request is sent
    Then the result is success
