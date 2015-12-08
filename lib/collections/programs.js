Programs = new Mongo.Collection("programs");

Programs.allow({
  insert: function (program) {
    return true;
  },
  update: function (program) {
    return true;
  },
  remove: function (program) {
    return true;
  }
});
