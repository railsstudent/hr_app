(function(a, window){'use strict';

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

app.controller('edit', ['$scope', 'EmployeeService','$routeParams',
  
  function($scope, EmployeeService, $routeParams) {
	  $scope.employee = {};

	  EmployeeService.get({
	    employeeId: $routeParams.employeeId
	  }, function (data) {
	    $scope.employee = data;
	  });
}]);

app.controller('view', ['$scope', 'EmployeeService', 
  function($scope, EmployeeService) {
    // See Listing 19-3 for complete code
    $scope.employees = [];
    $scope.firstName = $scope.lastName = '';

    EmployeeService.list(function (data) {
      $scope.employees = data;
    });
}]);}(angular, window));