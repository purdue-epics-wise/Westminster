Template.activitySubmit.events({
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

    var activity = {
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,//$("#program-submit-brain-targets").val().replace(/\s+/g, "").split(","),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      documentLink: $("#program-submit-document-link").val(),
      tutorialLink: $("#program-submit-tutorial-link").val()
    };

    console.log(activity);

    Meteor.call("insertActivity", activity, function (error, result) {
      if (error)
        return console.log("Could not insert Activity. Reason: " + error.reason);
      Router.go("activityDetails", { _id: result._id });
    });
  }
});
