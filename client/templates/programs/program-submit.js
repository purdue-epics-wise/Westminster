var currentFiles = new ReactiveVar();

Template.programSubmit.onRendered(function () {
  Session.set("program-docs", []);
  Session.set("current-doc-names", []);
  currentFiles.set([]);
});

Template.programSubmit.events({
  "submit form": function (e) {
    e.preventDefault();

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

    var program = {
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,//$("#program-submit-brain-targets").val().replace(/\s+/g, "").split(","),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      documentLink: $("#program-submit-document-link").val(),
      tutorialLink: $("#program-submit-tutorial-link").val()
    };

    console.log(program);

    Meteor.call("insertProgram", program, function (error, result) {
      if (error)
        return console.log("Could not insert program.");
      Session.set("program-docs", []);
      Router.go("programDetails", { _id: result._id });
    });
  },
  "click .upload-btn": function (e) {
    e.preventDefault();

    /*var file = $("#file").get(0).files[0];
    var fileObj = programDocs.insert(file);

    var sessionProgramDocs = Session.get("program-docs");
    var sessionDocNames = Session.get("current-doc-names");

    sessionProgramDocs.push(fileObj);
    sessionDocNames.push(fileObj.name());

    Session.set("program-docs", sessionProgramDocs);
    Session.set("current-doc-names", sessionDocNames);*/
  }
});

Template.programSubmit.helpers({
  fileNames: function () {
    var currentFilesReactive = Session.get("current-doc-names");
    if (sessionDocNames)
      return sessionDocNames;
  }
})
