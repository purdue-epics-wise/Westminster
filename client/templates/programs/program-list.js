Template.programList.onCreated(function () {
  Session.set("query-filter", [
    "Memory", "Visuospartial", "Concentration",
    "Orientation", "Language", "Judgement", "Sequencing"
  ]);
});

  Template.programList.onRendered(function () {
  var filterObject = {
      "Frontal": $("#Frontal-filter").is(':checked'),
      "Parietal": $("#Parietal-filter").is(':checked'),
      "Temporal": $("#Temporal-filter").is(':checked'),
      "Occipital": $("#Occipital-filter").is(':checked'),
  };
  var filterList = [];
  for (filter in filterObject) {
    filterList.push(filter);
  }
  Session.set("query-filter", filterList);
});

Template.programList.helpers({
  programs: function () {
    return Programs.find({
      brainTargets: { $in: Session.get("query-filter") }
    });
  }
});

Template.programList.events({
  "change .filter-checkbox": function (e) {
    e.preventDefault();

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
    console.log(filterList);
    Session.set("query-filter", filterList);
  }
});
