var currentFiles = new ReactiveVar();
var currentFileObjs = new ReactiveVar();
var fileNames;

Template.activitySubmit.onRendered(function () {
  currentFiles.set([]);
  currentFileObjs.set([]);
  fileNames = [];

  Session.set("upload-status", "No Files Uploaded");
  Session.set("documents-ready", false);
});

Template.activitySubmit.events({
  "submit form": function (e) {
    e.preventDefault();

    var filterList = getFilterList();
    uploadFiles();

    var activity = {
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,//$("#program-submit-brain-targets").val().replace(/\s+/g, "").split(","),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      tutorialLink: $("#program-submit-tutorial-link").val(),
      documents: currentFileObjs.get()
    };
    if(validateActivity(activity)) {
      /*Do nothing*/
    } else {
      return (submitError());
    }

    console.log(activity);

    Meteor.call("insertActivity", activity, function (error, result) {
      if (error)
        return console.log("Could not insert Activity. Reason: " + error.reason);

      Session.set("documents-ready", false);
      Router.go("activityDetails", { _id: result._id });
    });
  },
  "change .activity-file-input": function (e) {
    Session.set("upload-status", "Uploading...");

    FS.Utility.eachFile(e, function (file) {
      //var fileObj = new FS.File(file);
      var tmp = currentFiles.get();
      var files = _.union(tmp, file);

      console.log(files);
      currentFiles.set(files);
      Session.set("upload-status", "Uploaded Files");
    });
  }
});

Template.activitySubmit.helpers({
  fileNames: function () {
    var files = currentFiles.get();
    if (files && files.length > 0) {
      fileNames = [];
      _.each(files, function (fileObj) {
        fileNames.push(fileObj.name);
      });
      return fileNames;
    }
  },
  uploadStatus: function () {
    return Session.get("upload-status");
  }
});

var getFilterList = function () {
  var filterObject = {
      "Memory": $("#Memory-filter2").is(':checked'),
      "Visuospartial": $("#Visuospartial-filter2").is(':checked'),
      "Concentration": $("#Concentration-filter2").is(':checked'),
      "Orientation": $("#Orientation-filter2").is(':checked'),
      "Language": $("#Language-filter2").is(':checked'),
      "Judgement": $("#Judgement-filter2").is(':checked'),
      "Sequencing": $("#Sequencing-filter2").is(':checked')
  };
  var filterList = [];
  for (filter in filterObject) {
    if (filterObject[filter])
      filterList.push(filter);
  }

  return filterList;
};

var uploadFiles = function () {
  var files = currentFiles.get();
  console.log(files);

  if (files.length < 1)
    return console.log("No files were uploaded");

  var count = 0; 
  _.each(files, function (file) {
    var fileObj = ActivityFiles.insert(file, function (error, result) {
      if (error) {
        return console.log("Could not upload file.");
      } else {
        console.log("Inserted file: " + result._id);
        count++;
      }
    });

    var tmp = currentFileObjs.get();
    tmp.push(fileObj);
    currentFileObjs.set(tmp);

    if (files.length == count)
      Session.set("documents-ready", true);
  });
}

var uploadComplete = function (numberOfUploads, documentPaths) {
  if (numberOfUploads == documentPaths.length)
    return documentPaths;
}

var validateActivity = function(activity) {
      if (activity.title === "" || activity.description === "" || activity.tags === "" || activity.documentLink === "" || activity.tutorialLink === "") {
        return false;
      } else {
        return true;
      }
    }

var submitError = function(activity) {
  if ($("#activityErrorPopUp").length) {
    /* Do nothing */
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("One or more fields may be empty, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("activityError");
    element.appendChild(tag);
    document.getElementById("activityError").id = "activityErrorPopUp";
    }
  }