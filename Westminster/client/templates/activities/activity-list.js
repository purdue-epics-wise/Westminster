Template.activityList.onCreated(function () {
  Session.set("query-filter", [
    "Attention", "Language", "Visual-Spatial", "Sensory", "Planning/Judgement", "Computation", "Working Memory", "Long Term Memory", "Emotional Memory"
  ]);
});

  Template.activityList.onRendered(function () {
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
    filterList.push(filter);
  }
  Session.set("query-filter", filterList);
});

Template.activityList.helpers({
  activities: function () {
    return Activities.find({
      brainTargets: { $in: Session.get("query-filter") }
    });
  },
  activityIndex() {
    return ActivityIndex;
  },
});

Template.activityList.events({
  "change .filter-checkbox": function (e) {
    e.preventDefault();

    var filterObject = {
      "Attention": $("#Attention-filter").is(':checked'),
      "Language": $("#Language-filter").is(':checked'),
      "Visual-Spatial": $("#VisualSpatial-filter").is(':checked'),
      "Sensory": $("#Sensory-filter").is(':checked'),
      "Planning/Judgement": $("#Planning-filter").is(':checked'),
      "Computation": $("#Computation-filter").is(':checked'),
      "Working Memory": $("#Working-filter").is(':checked'),
      "Long Term Memory": $("#Longtermfilter").is(':checked'),
      "Emotional Memory": $("#Emotional-filter").is(':checked'),
    };

    var filterList = [];
    for (filter in filterObject) {
      if (filterObject[filter])
        filterList.push(filter);
    }
    console.log(filterList);
    Session.set("query-filter", filterList);
  }
});
Template.layout.events({
  "click #logout-button": function (e) {
    e.preventDefault();

    Meteor.logout(function (error) {
      if (error) {
        alert("We could not log you out at the moment. Please try again later.");
      } else {
        Router.go("login");
      }
    });
  }
});