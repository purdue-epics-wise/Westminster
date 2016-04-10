var currentDocumentIds;
var currentDocuments = new ReactiveVar();
var activityFiles;

const data = new ReactiveVar();

Template.activityDetails.onRendered(function () {
  Session.set("documents-ready", false);
  activityFiles = this.data.documents;
  Session.set("documents-ready", true);

  Tracker.autorun(() => {
    if (this.data) data.set(this.data);
  });
});

Template.activityDetails.helpers({
  documentRecords: function () {
    if (Session.get("documents-ready")) {
      var files = [];
      _.each(activityFiles, function (fileObj) {
        files.push(fileObj.getFileRecord());
      });
      return files;
    }
  },
  owner() {
    return data.get() && Meteor.users.findOne({
      _id: data.get().userId,
    }).profile;
  },
});
