angular.module("westminster").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state("programs", {
      url: "/programs",
      templateUrl: "client/programs/views/programs-list.ng.html",
      controller: "ProgramsListCtrl as programList"
    })
    .state("programDetails", {
      url: "/programs/:programId",
      templateUrl: "client/programs/views/program-details.ng.html",
      controller: "ProgramDetailCtrl"
    })
    .state("programSubmit", {
      url: "/program/create",
      templateUrl: "client/programs/views/program-submit.ng.html",
      controller: "ProgramSubmitCtrl"
    });

  $urlRouterProvider.otherwise("/programs");

});
