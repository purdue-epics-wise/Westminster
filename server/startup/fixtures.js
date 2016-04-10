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

    // Test Activities
    [
      {
        title: "Frontal Activity",
        description: "A Frontal activity",
        brainTargets: ["Frontal"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user1Id,
        created: now,
      },
      {
        title: "Parietal Activity",
        description: "A Parietal activity",
        brainTargets: ["Parietal"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user2Id,
        created: now,
      },
      {
        title: "Temporal Activity",
        description: "A Temporal activity",
        brainTargets: ["Temporal"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user3Id,
        created: now,
      },
      {
        title: "Occipital Activity",
        description: "A Occipital activity",
        brainTargets: ["Occipital"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user4Id,
        created: now,
      },
    ].forEach((activity) => {
      const tmpId = Activities.insert(activity);
      console.log("Inserted Activity [" + tmpId + "]");
    });

    // Linked Activities
    const linkedActivityIds = [];
    [
      {
        title: "Back to School Frontal Activity",
        description: "A Frontal activity",
        brainTargets: ["Frontal"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user1Id,
        created: now,
      },
      {
        title: "Back to School Parietal Activity",
        description: "A Parietal activity",
        brainTargets: ["Parietal"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user3Id,
        created: now,
      },
      {
        title: "Back to School Temporal Activity",
        description: "A Temporal activity",
        brainTargets: ["Temporal"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user2Id,
        created: now,
      },
      {
        title: "Back to School Occipital Activity",
        description: "A Occipital activity",
        brainTargets: ["Occipital"],
        tags: ["TestActivity", "Test"],
        tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
        documents: [],
        userId: user1Id,
        created: now,
      },
    ].forEach((activity) => {
      const tmpId = Activities.insert(activity);
      linkedActivityIds.push(tmpId);
      console.log("Inserted Activity [" + tmpId + "]");
    });

    const linkedProgram1 = {
      title: "Back to School",
      description: "A program containing 'back to school' themed activities",
      activityIds: linkedActivityIds,
      brainTargets: ["Memory", "Judgement", "Concentration", "Sequencing"],
      tags: ["School", "TestProgram"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      userId: user1Id,
      created: now
    }
    const tmpId = Programs.insert(linkedProgram1);
    console.log("Inserted Program [" + tmpId + "]");
  }
});
