var currentFiles = new ReactiveVar();
var currentFileObjs = new ReactiveVar();
var fileNames;

Template.activitySubmit.onRendered(function () {
  currentFiles.set([]);
  currentFileObjs.set([]);
  fileNames = [];

  Session.set("upload-status", "No Files Uploaded");
  Session.set("documents-ready", false);

  sliderInit();
});

Template.activitySubmit.events({
  "submit form": function (e) {
    e.preventDefault();

    var filterList = getFilterList();
    uploadFiles();

    var activity = {
      title: $("#activity-submit-title").val(),
      description: $("#activity-submit-description").val(),
      brainTargets: filterList,
      tags: $("#activity-submit-tags").val().replace(/\s+/g, "").split(","),
      tutorialLink: $("#activity-submit-tutorial-link").val(),
      documents: currentFileObjs.get(),
      time: Number($('#time-slider').val()),
    };

    if(validateActivity(activity)) {
      if ($("#activity-submit-tutorial-link").val() != "") {
        var errorCount = backendValidateActivity(activity);
        if (errorCount === 1) {
          return (tutLinkErrorFunc(activity));
        } 
      }
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

  return filterList;
};

function sliderInit() {
  const slider = $('#time-slider').noUiSlider({
    start: 0.5,
    step: 0.25,
    range: {
      min: 0.5,
      max: 3,
    },
  });

  $('#current-time').text('0.5 Minutes');
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

var validateActivity = function(activity) {
      if (activity.title === "" || activity.description === "" || activity.tags === "") {
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
  var evaluateTutURL = document.getElementById("activity-submit-tutorial-link").value;
  if(normalURL.test(evaluateTutURL) == false) {
    errorCount += 1;
  }
  /* If errorCount = 1, only Tutorial link error*/
  return(errorCount);
}

var tutLinkErrorFunc = function(activity) {
  if ($("#tutLinkErrorPopUp").length) {
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("Tutorial Link is not a valid URL, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("activityTutError");
    element.appendChild(tag);
    document.getElementById("activityTutError").id = "tutLinkErrorPopUp";
  }
}

var appendYoutube = function(activity) {
  var youtubeCheck = 0;
  var tutLink = document.getElementById("activity-submit-tutorial-link").value;
  // https://www.youtube.com/watch?v=kMhw5MFYU0s
  // https://www.youtube.com/embed/DfF1KhfZDBM
  for(i = 0; i < tutLink.length; i++) {
    if(tutLink[i] === 'y') {
      if(tutLink[i + 1] === 'o') {
        if(tutLink[i + 2] === 'u') {
          if(tutLink[i + 3] === 't') {
            if(tutLink[i + 4] === 'u') {
              if(tutLink[i + 5] === 'b') {
                if(tutLink[i + 6] === 'e') {
                  youtubeCheck++;
                }
              }
            }
          }
        }
      }
    }
  }
  

  if(youtubeCheck) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = tutLink.match(regExp);
    if ( match && match[7].length == 11 ){
        document.getElementById("activity-submit-tutorial-link").value =  "http://www.youtube.com/embed/" + match[7];
        console.log(document.getElementById("activity-submit-tutorial-link").value);
    }else{
        alert("Could not extract video ID.");
    }
  }

  //Finds the youtube video ID from a link
  // Not used in current build
  return;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}