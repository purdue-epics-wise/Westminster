Template.programPage.helpers({
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

Template.programPage.events({
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

    var program = {
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      documentLink: $("#program-submit-document-link").val(),
      tutorialLink: $("#program-submit-tutorial-link").val()
    };

    console.log(program);

    Programs.update(program, function (error, result) {
      if (error)
        return alert("An error occured");
      Router.go("programPage", { _id: result });
    });
  }
});