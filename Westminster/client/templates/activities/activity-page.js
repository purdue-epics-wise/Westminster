var startTime;
var currentFiles = new ReactiveVar();
var currentFileObjs = new ReactiveVar();
var fileNames;

data = new ReactiveVar();

Template.activityPage.onRendered(function () {
  startTime = this.data.time;
  sliderInit();
  currentFiles.set([]);
  currentFileObjs.set(this.data.documents);
  fileNames = [];

  Session.set("documents-ready", false);
  activityFiles = this.data.documents;
  Session.set("documents-ready", true);

  Tracker.autorun(() => {
    if (this.data) data.set(this.data);
  });
});


Template.activityPage.helpers({
  attentionChecked: function () {
    return this.brainTargets.indexOf("Attention") >= 0;
  },
  languageChecked: function () {
    return this.brainTargets.indexOf("Language") >= 0;
  },
  visualspatialChecked: function () {
    return this.brainTargets.indexOf("Visual-Spatial") >= 0;
  },
  sensoryChecked: function () {
    return this.brainTargets.indexOf("Sensory") >= 0;
  },
  planningChecked: function () {
    return this.brainTargets.indexOf("Planning/Judgement") >= 0;
  },
  computationChecked: function () {
    return this.brainTargets.indexOf("Computation") >= 0;
  },
  workingChecked: function () {
    return this.brainTargets.indexOf("Working Memory") >= 0;
  },
  longtermChecked: function () {
    return this.brainTargets.indexOf("Long Term Memory") >= 0;
  },
  emotionalChecked: function () {
    return this.brainTargets.indexOf("Emotional Memory") >= 0;
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
  uploadStatus: function () {
    return Session.get("upload-status");
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
    "Attention": $("#Attention-filter").is(':checked'),
    "Language": $("#Language-filter").is(':checked'),
    "Visual-Spatial": $("#VisualSpatial-filter").is(':checked'),
    "Sensory": $("#Sensory-filter").is(':checked'),
    "Planning/Judgement": $("#Planning-filter").is(':checked'),
    "Computation": $("#Computation-filter").is(':checked'),
    "Working Memory": $("#Working-filter").is(':checked'),
    "Long Term Memory": $("#Longterm-filter").is(':checked'),
    "Emotional Memory": $("#Emotional-filter").is(':checked'),
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

    Meteor.call("updateActivity", activity, this._id, this.userId, function (error, result) {
      if (error)
        return console.log("Could not update Activity. Reason: " + error.reason);
      Router.go("activityDetails", { _id: result._id });
    });
  },
  "change .activity-file-input": function (e) {
    Session.set("upload-status", "Uploading...");

    FS.Utility.eachFile(e, function (file) {
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
  },

  //function currently delets all Files in an activity. In future for QoL improvement
  //function should only removed the file if the corresponding button is pressed
  "click .deleteFile": function (e) {
    currentFileObjs.set([]);
    currentFiles.set([]);
    //fileNames = [];
    //var tmp = currentFileObjs.get();
    //var save = currentFileObjs.get();
    //_.each(activityFiles, function (fileObj) {
    //  save.pop();
    //});
    //for (var i = 0; i < 3; i++) {
    //  save.push(tmp.pop());
    //};
    //tmp.pop();
    //for (var i = 0; i < 3; i++) {
    //  tmp.push(save.pop());
    //};
    //tmp[2].remove();
    //tmp.pop();
    //for (var i = 0; i < tmp.length; i++) {
    //  tmp.pop();
    //};
    //tmp.set([]);
    //currentFileObjs.set(tmp);
    Session.set("documents-ready", false);
    //Session.set("documents-ready", true);

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
