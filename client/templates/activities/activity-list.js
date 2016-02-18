
Template.activityList.onCreated(function () {
  Session.set("query-filter", [
    "Memory", "Visuospartial", "Concentration",
    "Orientation", "Language", "Judgement", "Sequencing"
  ]);
});

  Template.activityList.onRendered(function () {
  var filterObject = {
      "Memory": $("#Memory-filter").is(':checked'),
      "Visuospartial": $("#Visuospartial-filter").is(':checked'),
      "Concentration": $("#Concentration-filter").is(':checked'),
      "Orientation": $("#Orientation-filter").is(':checked'),
      "Language": $("#Language-filter").is(':checked'),
      "Judgement": $("#Judgement-filter").is(':checked'),
      "Sequencing": $("#Sequencing-filter").is(':checked')
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
  }
});

Template.activityList.events({
  "change .filter-checkbox": function (e) {
    e.preventDefault();

    var filterObject = {
        "Memory": $("#Memory-filter").is(':checked'),
        "Visuospartial": $("#Visuospartial-filter").is(':checked'),
        "Concentration": $("#Concentration-filter").is(':checked'),
        "Orientation": $("#Orientation-filter").is(':checked'),
        "Language": $("#Language-filter").is(':checked'),
        "Judgement": $("#Judgement-filter").is(':checked'),
        "Sequencing": $("#Sequencing-filter").is(':checked')
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
