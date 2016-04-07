var currentFiles = new ReactiveVar();
var selectedActivities = new ReactiveVar()

Template.programSubmit.onRendered(function () {
  Session.set("program-docs", []);
  Session.set("current-doc-names", []);
  currentFiles.set([]);

  selectedActivities.set([]);

  Session.set("show-activity-select-modal", false);
});

Template.programSubmit.events({
  "submit form": function (e) {
    e.preventDefault();

    /*var filterObject = {
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
    }*/

    var program = {
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      activityIds: selectedActivities.get(),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      documentLink: $("#program-submit-document-link").val(),
      tutorialLink: $("#program-submit-tutorial-link").val()
    };
    
    if(validateProgram(program)) {
      /*If the program's frontend validation is true, then move on to specific restriction validation*/
      var errorCount = backendValidateProgram(program);
      if (errorCount === 3) {
        return (bothLinkErrorFunc());
      } else if (errorCount === 2) {
        return (docLinkErrorFunc());
      } else if (errorCount === 1) {
        return (tutLinkErrorFunc()); 
      }
    } else {
      return (submitError());
    }
    console.log(program);
/*VALIDATE PROGRAM GOES HERE WEE...HAW*/
    Meteor.call("insertProgram", program, function (error, result) {
      if (error)
        return console.log("Could not insert program.");
      Session.set("program-docs", []);
      Router.go("programDetails", { _id: result._id });
    });
  }, "click .upload-btn": function (e) {
    e.preventDefault();

    /*var file = $("#file").get(0).files[0];
    var fileObj = programDocs.insert(file);

    var sessionProgramDocs = Session.get("program-docs");
    var sessionDocNames = Session.get("current-doc-names");

    sessionProgramDocs.push(fileObj);
    sessionDocNames.push(fileObj.name());

    Session.set("program-docs", sessionProgramDocs);
    Session.set("current-doc-names", sessionDocNames);*/
  },
  /* Activity Select Modal */
  "click .add-activities-btn": function (e) {
    e.preventDefault();
    Session.set("show-activity-select-modal", true);
  },
  "click .activity-select-cancel-btn": function (e) {
    e.preventDefault();
    Session.set("show-activity-select-modal", false);
  },
  "click .activity-select-modal-item": function (e) {
    e.preventDefault();

    var tmp = selectedActivities.get();
    $(e.target).toggleClass("selected");

    if ($(e.target).hasClass("selected"))
      selectedActivities.set(_.union(tmp, this._id));
    else
      selectedActivities.set(_.difference(tmp, this._id));
  },
  "click .activity-select-submit-btn": function (e) {
    e.preventDefault();
    Session.set("show-activity-select-modal", false);
  }
});


Template.programSubmit.helpers({
  fileNames: function () {
    var currentFilesReactive = Session.get("current-doc-names");
    if (sessionDocNames)
      return sessionDocNames;
  },
  /* Acitivity Select Modal */
  showActivities: function () {
    return Session.get("show-activity-select-modal");
  },
  uploadActivities: function () {
    return false;
  },
  activities: function () {
    return Activities.find();
  }
})


var validateProgram = function(program) {
  if (program.title === "" || program.description === "" || program.tags === "" || program.documentLink === "" || program.tutorialLink === "") {
    return false;
  } else {
    return true;
  }
}

var docLinkErrorFunc = function(program) {
  if ($("#docLinkErrorPopUp").length) {
   } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("Document Link is not a valid URL, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("docLinkError");
    element.appendChild(tag);
    document.getElementById("docLinkError").id = "docLinkErrorPopUp";
   }
 }

var tutLinkErrorFunc = function(program) {
  if ($("#tutLinkErrorPopUp").length) {
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("Tutorial Link is not a valid URL, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("tutLinkError");
    element.appendChild(tag);
    document.getElementById("tutLinkError").id = "tutLinkErrorPopUp";
  }
}

var submitError = function(program) {
  if ($("#submitErrorPopUp").length) {
    /* Do nothing*/
  } else {
  var tag = document.createElement("p");
  var text = document.createTextNode("One or more fields have invalid data, please check and resubmit.");
  tag.appendChild(text);
  var element = document.getElementById("submitError");
  element.appendChild(tag);
  document.getElementById("submitError").id = "submitErrorPopUp";
  }
}

var bothLinkErrorFunc = function(program) {
  /*Used if both Tutorial Link and Document Link are invalid*/
  if ($("#tutLinkErrorPopUp").length) {
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("Tutorial Link is not a valid URL, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("tutLinkError");
    element.appendChild(tag);
    document.getElementById("tutLinkError").id = "tutLinkErrorPopUp";
  }
  
  if ($("#docLinkErrorPopUp").length) {
  } else {
    var tag = document.createElement("p");
    var text = document.createTextNode("Document Link is not a valid URL, please check and resubmit.");
    tag.appendChild(text);
    var element = document.getElementById("docLinkError");
    element.appendChild(tag);
    document.getElementById("docLinkError").id = "docLinkErrorPopUp";
  }
}

var backendValidateProgram = function(program) {
  var errorCount = 0;
  var normalURL = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
  var evaluateDocURL = document.getElementById("program-submit-document-link").value;
  var evaluateTutURL = document.getElementById("program-submit-tutorial-link").value;
  if(normalURL.test(evaluateTutURL) == false) {
    errorCount += 1;
  }

  if(normalURL.test(evaluateDocURL) == false) {
    errorCount += 2;
  }
  /* If errorCount = 1, only Tutorial link error
  If errorCount = 2, only Document link error
  If errorCount = 3, both Tutorial and Document link error */
  return(errorCount);
}
