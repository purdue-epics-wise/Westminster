Template.activityPage.helpers({
  memoryChecked: function () {
    return this.brainTargets.indexOf("Memory") >= 0;
  },
  visuospartialChecked: function () {
    return this.brainTargets.indexOf("Visuospartial") >= 0;
  },
  concentrationChecked: function () {
    return this.brainTargets.indexOf("Concentration") >= 0;
  },
  orientationChecked: function () {
    return this.brainTargets.indexOf("Orientation") >= 0;
  },
  languageChecked: function () {
    return this.brainTargets.indexOf("Language") >= 0;
  },
  judgementChecked: function () {
    return this.brainTargets.indexOf("Judgement") >= 0;
  },
  sequencingChecked: function () {
    return this.brainTargets.indexOf("Sequencing") >= 0;
  }
})

Template.activityPage.events({
  "submit form": function (e) {
    e.preventDefault();

    var filterObject = {
        "Memory": $("#Memory-filter3").is(':checked'),
        "Visuospartial": $("#Visuospartial-filter3").is(':checked'),
        "Concentration": $("#Concentration-filter3").is(':checked'),
        "Orientation": $("#Orientation-filter3").is(':checked'),
        "Language": $("#Language-filter3").is(':checked'),
        "Judgement": $("#Judgement-filter3").is(':checked'),
        "Sequencing": $("#Sequencing-filter3").is(':checked')
    };
    var filterList = [];
    for (filter in filterObject) {
      if (filterObject[filter])
        filterList.push(filter);
    }

    var activity = {
      _id: this._id,
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      documentLink: $("#program-submit-document-link").val(),
      tutorialLink: $("#program-submit-tutorial-link").val(),
      userId: this.userId
    };

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
  }
});
