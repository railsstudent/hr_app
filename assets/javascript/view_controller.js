
app.controller('view', ['$scope', 'EmployeeService', 
  function($scope, EmployeeService) {
    // See Listing 19-3 for complete code
    $scope.employees = [];
    $scope.firstName = $scope.lastName = '';

    EmployeeService.list(function (data) {
      $scope.employees = data;
    });
}]);