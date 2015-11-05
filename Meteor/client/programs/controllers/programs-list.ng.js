angular.module("westminster").controller("ProgramsListCtrl", function ($scope, $meteor) {
  $scope.programs = $meteor.collection(Programs);

  $scope.remove = function (program) {
    $scope.programs.splice($scope.programs.indexOf(program), 1);
  };

  $scope.removeAll = function () {
    $scope.programs.remove();
  }
});
