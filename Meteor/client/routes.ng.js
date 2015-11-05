angular.module("westminster").config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state("programs", {
    url: "/programs",
    templateUrl: "client/programs/views/programs-list.ng.html",
    controller: "ProgramsListCtrl"
  }).state("programDetails", {
    url: "/programs/:programId",
    templateUrl: "client/programs/views/program-details.ng.html",
    controller: "ProgramDetailCtrl"
  });

  $urlRouterProvider.otherwise("/programs");
});
