'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
  // See Listing 19-2 for complete code
    $routeProvider
    .when('/', {
      templateUrl: 'home.html'
    })
    .when('/employees', {
      templateUrl: 'employees.html',
      controller: 'EmployeesCtrl'
    })
    .when('/employees/:employeeId', {
      templateUrl: 'employee.html',
      controller: 'EmployeeCtrl'
    })
    .when('/teams', {
      templateUrl: 'teams.html',
      controller: 'TeamsCtrl'
    })
    .when('/teams/:teamId', {
      templateUrl: 'team.html',
      controller: 'TeamCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.factory('EmployeeService', ['$resource', function($resource) {
  // See Listing 19-3 for complete code
  return $resource('/employees/:employeeId', {}, {
    list: {
      isArray: true
    },
    get: {
      isArray: false
    }
  });
}]);
