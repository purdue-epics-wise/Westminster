var currentDocumentIds;
var currentDocuments = new ReactiveVar();
var activityFiles;

Template.activityDetails.onRendered(function () {
  currentDocumentIds = this.data;
  currentDocuments.set(null);

  Session.set("documents-ready", false);
  activityFiles = this.data.documents;
  Session.set("documents-ready", true);
  console.log(currentDocumentIds);
});

Template.activityDetails.helpers({
  documentRecords: function () {
    if (Session.get("documents-ready")) {
      console.log(activityFiles);
      var tmp = _.each(activityFiles, function (fileObj) {
        return fileObj.getFileRecord();
      });
      console.log(tmp);
      return tmp;
    }
  }
});
