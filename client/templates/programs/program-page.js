const activityIds = new ReactiveVar();
var selectedActivities = new ReactiveVar()
selectedActivities.set([]);
Template.programPage.onRendered(() => {
  Tracker.autorun(() => {
    //if (this.activityIds) activityIds.set(this.activityIds);
    if (this.data) data.set(this.data);
  });  
});

Template.programPage.helpers({
  owner() {
    const user = Meteor.users.findOne({
      _id: this.userId,
    });
    return user && user.profile;
  },
  originalActivities() {
    return this.activityIds && Activities.find({
      _id: {
        $in: this.activityIds,
      },
    }) || [];
  },
    /* Acitivity Select Modal */
  showActivities: function () {
    return Session.get("show-activity-select-modal");
  },
  uploadActivities: function () {
    return false;
  },
  allActivities: function () {
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
      _id: this._id,
      /*title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      brainTargets: filterList,
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      documentLink: $("#program-submit-document-link").val(),
      tutorialLink: $("#program-submit-tutorial-link").val(),*/
      title: $("#program-submit-title").val(),
      description: $("#program-submit-description").val(),
      activityIds: selectedActivities.get(),
      tags: $("#program-submit-tags").val().replace(/\s+/g, "").split(","),
      tutorialLink: $("#program-submit-tutorial-link").val(),
      userId: this.userId
    };

    console.log(program);

    Meteor.call("updateProgram", program, function (error, result) {
      if (error)
        return console.log("Could not update program.");
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
  },
  "click .deleteActivity": function (e) {
    selectedActivities.set([]);
  }
});
