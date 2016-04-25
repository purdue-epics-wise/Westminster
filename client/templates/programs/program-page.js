var selectedActivities = new ReactiveVar()

Template.programPage.onRendered(function () {
  Session.set("program-docs", []);
  Session.set("current-doc-names", []);

  selectedActivities.set(this.data.activityIds);

  Session.set("show-activity-select-modal", false);
});

Template.programPage.helpers({
  fileNames: function () {
    var currentFilesReactive = Session.get("current-doc-names");
    if (sessionDocNames)
      return sessionDocNames;
  },
  /* Acitivity Select Modal */
  uploadActivities: function () {
    return false;
  },
  activities: function () {
    return Activities.find();
  },
  selectedActivities: function () {
    if (selectedActivities.get()) {
      return Activities.find({
        _id: {
          $in: selectedActivities.get()
        }
      });
    }
  },
  showActivities() {
    return Session.get("show-activity-select-modal") ? '' : 'modal-hidden';
  },
})

Template.programPage.events({
  "submit form": function (e) {
    e.preventDefault();

    var program = {
      _id: this._id,
      userId: this.userId,
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      activityIds: selectedActivities.get(),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      tutorialLink: $("#program-submit-tutorial-link").val()
    };

    console.log(program);

    Meteor.call("updateProgram", program, function (error, result) {
      if (error)
        return console.log(`Could not update program. Reason: ${error.reason}`);
      Router.go("programDetails", { _id: result._id });
    });
  },
  "click .delete-btn": function (e) {
    e.preventDefault();

    Meteor.call("deleteProgram", this._id, this.userId, function (error, result) {
      if (error)
        return console.log("Could not remove program.");
      Router.go("programList");
    });
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
