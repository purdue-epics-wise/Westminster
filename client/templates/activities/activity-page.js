var startTime;

Template.activityPage.onRendered(function () {
  startTime = this.data.time;
  sliderInit();
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
      userId: this.userId,
      time: Number($('#time-slider').val()),
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
