var currentFiles = new ReactiveVar();
var currentFileObjs = new ReactiveVar();

Template.activityPage.onCreated(() => {
  Session.set('activity-page-rendered', false);
  Session.set("documents-ready", false);
});

Template.activityPage.onRendered(() => {
  Session.set('activity-page-rendered', true);

  currentFileObjs.set([]);
  currentFiles.set([]);
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
  rendered() {
    if (Session.get('activity-page-rendered') && this.time) {
      sliderInit(this.time);

      activityFiles = this.documents;
      Session.set("documents-ready", true);
    }
    return '';
  },
  fileNames: function () {
    if (Session.get("documents-ready")) {
      var prevFiles = [];
      _.each(activityFiles, function (fileObj) {
        prevFiles.push(fileObj.getFileRecord());
      });

      const files = currentFiles.get();
      if (files && files.length > 0) {
        prevFiles = _.union(prevFiles, files);
      }

      return prevFiles;
    }
  },
})

Template.activityPage.events({
  "submit form": function (e) {
    e.preventDefault();

    var filterList = getFilterList();
    uploadFiles();

    var activity = {
      _id: this._id,
      userId: this.userId,
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,//$("#program-submit-brain-targets").val().replace(/\s+/g, "").split(","),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      tutorialLink: $("#program-submit-tutorial-link").val(),
      documents: _.union(this.documents, currentFileObjs.get()),
      time: Number($('#time-slider').val()),
    };

    if(validateActivity(activity)) {
      var errorCount = backendValidateActivity(activity);
      if (errorCount === 1) {
        return (tutLinkErrorFunc(activity));
      }
    }

    console.log(activity);

    Meteor.call("updateActivity", activity, function (error, result) {
      if (error)
        return console.log("Could not insert Activity. Reason: " + error.reason);
      Router.go("activityDetails", { _id: result._id });
    });
  },
  "click .delete-btn": function (e) {
    e.preventDefault();

    Meteor.call("deleteActivity", this._id, this.userId, function (error, result) {
      if (error)
        return console.log("Could not remove activity.");
      Router.go("activityList");
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
});

function getFilterList() {
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

  return filterList;
};

function sliderInit(time) {
  const slider = $('#time-slider').noUiSlider({
    start: time,
    step: 0.25,
    range: {
      min: 0.5,
      max: 3,
    },
  });

  $('#current-time').text(`${time} Minutes`);
  slider.on('slide', (e) => {
    $('#current-time').text(`${$(e.target).val()} Minutes`);
  });
}

function uploadFiles() {
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

var backendValidateActivity = function(activity) {
  var errorCount = 0;
  var normalURL = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
  var evaluateTutURL = document.getElementById("program-submit-tutorial-link").value;
  if(normalURL.test(evaluateTutURL) == false) {
    errorCount += 1;
  }
  /* If errorCount = 1, only Tutorial link error*/
  return(errorCount);
}

var tutLinkErrorFunc = function(activity) {
  // Optional field now
  /*if ($("#tutLinkErrorPopUp").length) {
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("Tutorial Link is not a valid URL, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("activityTutError");
    element.appendChild(tag);
    document.getElementById("activityTutError").id = "tutLinkErrorPopUp";
  }*/
}
