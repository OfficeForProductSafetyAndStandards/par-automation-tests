@regression @ui
Feature: UI Tests


  Scenario: Page Navigation
    Given I visit TIMZTOS SOLUTIONS
    When I navigate to the explore-solutions page
    Then page should have text : Explore Timztos Solutions

