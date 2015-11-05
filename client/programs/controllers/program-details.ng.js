angular.module("westminster").controller("ProgramDetailCtrl", function ($scope, $stateParams, $meteor) {
  $scope.program = $meteor.object(Programs, $stateParams.programId);
});
