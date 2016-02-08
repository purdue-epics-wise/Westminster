var activityFilesStore = new FS.Store.GridFS("activityFiles");
var programFilesStore = new FS.Store.GridFS("programFiles");

ActivityFiles = new FS.Collection("activityFiles", {
  stores: [activityFilesStore]
});

ProgramFiles = new FS.Collection("programFiles", {
  stores: [programFilesStore]
});


if (Meteor.isServer) {
  ActivityFiles.deny({
    insert: function () {
      return false;
    },
    update: function () {
      return false;
    },
    remove: function () {
      return false;
    },
    download: function () {
      return false;
    }
  });

  ActivityFiles.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    },
    download: function () {
      return true;
    }
  });
}
