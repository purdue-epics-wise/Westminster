Meteor.startup(function () {
  if (Programs.find().count() == 0) {
    var programs = [
      {
        title: "Back to School",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Memory", "Visual", "Smell"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      }
    ];

    for (var i = 0; i < programs.length; i++) {
      Programs.insert(programs[i]);
    }
  }
});
