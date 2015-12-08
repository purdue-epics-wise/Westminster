Template.programPage.events({
  "submit form": function (e) {
    e.preventDefault();

    var program = {
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: $("#program-submit-brain-targets").val().replace(/\s+/g, "").split(","),
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
