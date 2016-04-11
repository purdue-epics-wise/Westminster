Meteor.startup(function () {
  if (Activities.find().count() === 0) {
    const now = new Date().getTime();
    let interval = 0;
    let tmpId = '';

    console.log("Creating test users");

    // Insert test users
    const user1Id = Meteor.users.insert({
      profile: {
        fullName: "Rachel Witt",
        community: "Westminster",
      }
    });
    const user2Id = Meteor.users.insert({
      profile: {
        fullName: "Joe Trichak",
        community: "Westminster",
      }
    });
    const user3Id = Meteor.users.insert({
      profile: {
        fullName: "Andrew Heil",
        community: "Westminster",
      }
    });
    const user4Id = Meteor.users.insert({
      profile: {
        fullName: "John Doe",
        community: "Westminster",
      }
    });

    // Test Files
    const fileObj1 = ActivityFiles.insert('assets/app/documents/frontal.parietal.food.3min.paper.docx');

    console.log("Waiting on file 1...");
    interval = setInterval(() => {
      clearInterval(interval);
    }, 2000);

    const fileObj2 = ActivityFiles.insert('assets/app/documents/occipital.parietal.animal.45sec.paper.pub');

    console.log("Waiting on file 2...");
    interval = setInterval(() => {
      clearInterval(interval);
    }, 2000);

    // Test Activities w/Files
    const documentActivityIds = [];
    [
      {
        title: "Food Activity",
        description: "A test activity with documents.",
        brainTargets: ['Frontal', 'Parietal'],
        tags: ["food"],
        tutorialLink: '',
        documents: [fileObj1],
        userId: user1Id,
        created: now,
        time: 3,
        deliveryMethod: 'paper',
      },
      {
        title: "Animal Activity",
        description: "A test activity with documents.",
        brainTargets: ['Occipital', 'Parietal'],
        tags: ['animal'],
        tutorialLink: '',
        documents: [fileObj2],
        userId: user1Id,
        created: now,
        time: 0.75,
        deliveryMethod: 'paper',
      },
    ].forEach((activity) => {
      tmpId = Activities.insert(activity);
      documentActivityIds.push(tmpId);
      console.log("Inserted Activity [" + tmpId + "]");
    });

    const documentProgram1 = {
      title: "Example Program",
      description: "A program consisting of two activities with documents.",
      activityIds: documentActivityIds,
      brainTargets: ["Frontal", "Parietal", "Occipital"],
      tags: ["School", "TestProgram"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      userId: user1Id,
      created: now,
      time: 3.75,
    }
    tmpId = Programs.insert(documentProgram1);
    console.log("Inserted Document Program [" + tmpId + "]");

    // Test Activities w/o Files
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
        time: 1.5,
        deliveryMethod: 'paper',
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
        time: 2.6,
        deliveryMethod: 'paper',
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
        time: 0.6,
        deliveryMethod: 'paper',
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
        time: 3,
        deliveryMethod: 'paper',
      },
    ].forEach((activity) => {
      tmpId = Activities.insert(activity);
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
        time: 1.2,
        deliveryMethod: 'paper',
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
        time: 3,
        deliveryMethod: 'paper',
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
        time: 1.5,
        deliveryMethod: 'paper',
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
        time: 2.6,
        deliveryMethod: 'paper',
      },
    ].forEach((activity) => {
      tmpId = Activities.insert(activity);
      linkedActivityIds.push(tmpId);
      console.log("Inserted Activity [" + tmpId + "]");
    });

    const linkedProgram1 = {
      title: "Back to School",
      description: "A program containing 'back to school' themed activities",
      activityIds: linkedActivityIds,
      brainTargets: ["Frontal", "Parietal", "Temporal", "Occipital"],
      tags: ["School", "TestProgram"],
      tutorialLink: "https://www.youtube.com/embed/kMhw5MFYU0s",
      userId: user1Id,
      created: now,
      time: 7.3,
    }
    tmpId = Programs.insert(linkedProgram1);
    console.log("Inserted Linked Program [" + tmpId + "]");
  }
});
