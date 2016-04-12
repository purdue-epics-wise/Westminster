Meteor.publish("programs", function () {
  return Programs.find();
});

Meteor.publish("programById", function (programId) {
  check(programId, String);
  return Programs.find(programId);
});

Meteor.publish("activities", function () {
  return Activities.find();
});

Meteor.publish("activityById", function (activityId) {
  check(activityId, String);
  return Activities.find(activityId);
})

Meteor.publish("activityFiles", function () {
  return ActivityFiles.find();
});

// Needs to only publish user names, communities
// And should only be accessible on certain pages
Meteor.publish("users", function () {
  return Meteor.users.find();
});
