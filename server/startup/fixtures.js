Meteor.startup(function () {
  if (Activities.find().count() === 0) {
    var now = new Date().getTime();

    // Insert test users
    var user1Id = Meteor.users.insert({
      profile: {
        fullName: "Barack Obama",
        community: "Westminster",
      }
    });
    var user2Id = Meteor.users.insert({
      profile: {
        fullName: "Joe Mama",
        community: "Westminster",
      }
    });
    var user3Id = Meteor.users.insert({
      profile: {
        fullName: "Keegan Bruns",
        community: "Westminster",
      }
    });
    var user4Id = Meteor.users.insert({
      profile: {
        fullName: "Ronald McDonald",
        community: "Westminster",
      }
    });

    // Insert test activities
    var activities = [
      {
        title: "Memory Activity",
        description: "A memory activity",
        brainTargets: ["Memory"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user1Id,
        created: now
      },
      {
        title: "Visuospartial Activity",
        description: "A visuospartial activity",
        brainTargets: ["Visuospartial"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user2Id,
        created: now
      },
      {
        title: "Concentration Activity",
        description: "A concentration activity",
        brainTargets: ["Concentration"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user3Id,
        created: now
      },
      {
        title: "Orientation Activity",
        description: "A orientation activity",
        brainTargets: ["Orientation"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user4Id,
        created: now
      },
      {
        title: "Language Activity",
        description: "A language activity",
        brainTargets: ["Language"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user1Id,
        created: now
      },
      {
        title: "Judgement Activity",
        description: "A judgement activity",
        brainTargets: ["Judgement"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user2Id,
        created: now
      },
      {
        title: "Sequencing Activity",
        description: "A sequencing activity",
        brainTargets: ["Sequencing"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user3Id,
        created: now
      }
    ];
    for (var i = 0; i < activities.length; i++) {
      var tmpId = Activities.insert(activities[i]);
      console.log("Inserted Activity [" + tmpId + "]");
    }

    var linkedActivity1 = {
      title: "Back to School Judgement Activity",
      description: "A judgement activity",
      brainTargets: ["Judgement"],
      tags: ["TestActivity", "Test"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      documents: [],
      userId: user1Id,
      created: now
    };
    var linkedActivity2 = {
      title: "Back to School Concentration Activity",
      description: "A concentration activity",
      brainTargets: ["Concentration"],
      tags: ["TestActivity", "Test"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      documents: [],
      userId: user3Id,
      created: now
    };
    var linkedActivity3 = {
      title: "Back to School Memory Activity",
      description: "A memory activity",
      brainTargets: ["Memory"],
      tags: ["TestActivity", "Test"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      documents: [],
      userId: user2Id,
      created: now
    };
    var linkedActivity4 = {
      title: "Back to School Sequencing Activity",
      description: "A sequencing activity",
      brainTargets: ["Sequencing"],
      tags: ["TestActivity", "Test"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      documents: [],
      userId: user1Id,
      created: now
    };
    var linkedActivity1Id = Activities.insert(linkedActivity1);
    console.log("Inserted Activity [" + linkedActivity1Id + "]");
    var linkedActivity2Id = Activities.insert(linkedActivity2);
    console.log("Inserted Activity [" + linkedActivity2Id + "]");
    var linkedActivity3Id = Activities.insert(linkedActivity3);
    console.log("Inserted Activity [" + linkedActivity3Id + "]");
    var linkedActivity4Id = Activities.insert(linkedActivity4);
    console.log("Inserted Activity [" + linkedActivity4Id + "]");

    var linkedProgram1 = {
      title: "Back to School",
      description: "A program containing 'back to school' themed activities",
      activityIds: [linkedActivity1Id, linkedActivity2Id, linkedActivity3Id, linkedActivity4Id],
      brainTargets: ["Memory", "Judgement", "Concentration", "Sequencing"],
      tags: ["School", "TestProgram"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      userId: user1Id,
      created: now
    }
    var tmpId = Programs.insert(linkedProgram1);
    console.log("Inserted Program [" + tmpId + "]");
  }
});
