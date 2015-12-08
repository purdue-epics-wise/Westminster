// Angular-Meteor Code

/*angular.module("westminster").controller("ProgramsListCtrl", function ($scope, $meteor) {
  //$scope.programs = $meteor.collection(Programs).subscribe("programs");

  $scope.filters = [
    "Memory",
    "Visuospartial",
    "Concentration",
    "Orientation",
    "Language",
    "Judgement",
    "Sequencing"
  ];

  $scope.filter = [];
  if ($scope.filter.length <= 0) {
    $scope.filter = [
      "Memory",
      "Visuospartial",
      "Concentration",
      "Orientation",
      "Language",
      "Judgement",
      "Sequencing"
    ];
  }

  $scope.changeFilter = function (filter) {
    var filterObject = {
      "Memory": $("#Memory-filter").is(':checked'),
      "Visuospartial": $("#Visuospartial-filter").is(':checked'),
      "Concentration": $("#Concentration-filter").is(':checked'),
      "Orientation": $("#Orientation-filter").is(':checked'),
      "Language": $("#Language-filter").is(':checked'),
      "Judgement": $("#Judgement-filter").is(':checked'),
      "Sequencing": $("#Sequencing-filter").is(':checked')
    };

    var filterList = [];
    for (filter in filterObject) {
      if (filterObject[filter]) {
        filterList.push(filter);
      }
    }

    $scope.filter = filterList;
    console.log($scope.filter);

    $scope.programs = $meteor.collection(function () {
      console.log("This happened");
      return Programs.find({
        brainTargets: { $in: $scope.filter }
      });
    }).subscribe("programs");
  };

  $scope.programs = $meteor.collection(function () {
    console.log("This happened");
    return Programs.find({
      brainTargets: { $in: $scope.filter }
    });
  }).subscribe("programs");
  //$meteor.subscribe("programs", test);

  $scope.remove = function (program) {
    $scope.programs.splice($scope.programs.indexOf(program), 1);
  };

  $scope.removeAll = function () {
    $scope.programs.remove();
  }
});*/
