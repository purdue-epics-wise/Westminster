Activities = new Mongo.Collection("activities");

Activities.allow({
  insert: function (activity) {
    return true;
  },
  update: function (activity) {
    return true;
  },
  remove: function (activity) {
    return true;
  }
});
