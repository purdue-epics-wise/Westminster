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