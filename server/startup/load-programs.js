Meteor.startup(function () {
  if (Programs.find().count() == 0) {
    var programs = [
      {
        title: "Back to School",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Memory", "Visuospartial", "Concentration"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Memory Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Memory"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Visuospartial Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Visuospartial"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Concentration Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Concentration"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Orientation Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Orientation"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Language Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Language"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Judgement Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Judgement"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
      {
        title: "Sequencing Special",
        description: "A program containing 'back to school' themed activities",
        brainTargets: ["Sequencing"],
        tags: ["School"],
        documentLink: "google.com",
        tutorialLink: "purdue.edu"
      },
    ];

    for (var i = 0; i < programs.length; i++) {
      Programs.insert(programs[i]);
    }
  }
});
