var currentDocumentIds;
var currentDocuments = new ReactiveVar();
var activityFiles;

Template.activityDetails.onRendered(function () {
  Session.set("documents-ready", false);
  activityFiles = this.data.documents;
  Session.set("documents-ready", true);
});

Template.activityDetails.helpers({
  documentRecords: function () {
    if (Session.get("documents-ready")) {
      var files = [];
      _.each(activityFiles, function (fileObj) {
        files.push(fileObj.getFileRecord());
      });
      console.log(files);
      return files;
    }
  }
});
