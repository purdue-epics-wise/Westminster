var startTime;
var currentFiles = new ReactiveVar();
var currentFileObjs = new ReactiveVar();
var fileNames;

data = new ReactiveVar();

Template.activityPage.onRendered(function () {
  startTime = this.data.time;
  sliderInit();
  currentFiles.set([]);
  currentFileObjs.set([]);
  fileNames = [];

  Session.set("documents-ready", false);
  activityFiles = this.data.documents;
  Session.set("documents-ready", true);

  Tracker.autorun(() => {
    if (this.data) data.set(this.data);
  });
});


Template.activityPage.helpers({
  frontalChecked: function () {
    return this.brainTargets.indexOf("Frontal") >= 0;
  },
  parietalChecked: function () {
    return this.brainTargets.indexOf("Parietal") >= 0;
  },
  temporalChecked: function () {
    return this.brainTargets.indexOf("Temporal") >= 0;
  },
  occipitalChecked: function () {
    return this.brainTargets.indexOf("Occipital") >= 0;
  },
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
  documentRecords: function () {
    if (Session.get("documents-ready")) {
      var files = [];
      _.each(activityFiles, function (fileObj) {
        files.push(fileObj.getFileRecord());
      });
      return files;
    }
  },
})

Template.activityPage.events({
  "submit form": function (e) {
    e.preventDefault();

    var filterObject = {
    "Frontal": $("#Frontal-filter").is(':checked'),
    "Parietal": $("#Parietal-filter").is(':checked'),
    "Temporal": $("#Temporal-filter").is(':checked'),
    "Occipital": $("#Occipital-filter").is(':checked'),
    };
    var filterList = [];
    for (filter in filterObject) {
      if (filterObject[filter])
        filterList.push(filter);
    }
    uploadFiles();

    var activity = {
      _id: this._id,
      title: $("#activity-submit-title").val(),
      description: $("#activity-submit-description").val(),
      brainTargets: filterList,
      tags: $("#activity-submit-tags").val().replace(/\s+/g, "").split(","),
      documents: currentFileObjs.get(),
      tutorialLink: $("#activity-submit-tutorial-link").val(),
      //userId: this.userId,
      time: Number($('#time-slider').val()),
    };

    console.log(activity);
    console.log(this._id);
    console.log(activity._id);
    console.log(activity.userId);
    console.log(this.userId);
    console.log(Meteor.userId());

    Meteor.call("updateActivity", activity, this._id, this.userId, function (error, result) {
      if (error)
        return console.log("Could not update Activity. Reason: " + error.reason);
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
  },
  "click .delete-btn": function (e) {
    e.preventDefault();
    Meteor.call("deleteActivity", this._id, this.userId, function (error, result) {
      if (error)
        return console.log("Could not remove activity. Reason: " + error.reason);
      Router.go("activityList");
    });
  }
});

function sliderInit() {
  const slider = $('#time-slider').noUiSlider({
    start: startTime,
    step: 0.25,
    range: {
      min: 0.5,
      max: 3,
    },
  });

  $('#current-time').text(`${startTime} Minutes`);
  slider.on('slide', (e) => {
    $('#current-time').text(`${$(e.target).val()} Minutes`);
  });
}

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
