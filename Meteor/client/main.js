if (Meteor.isClient) {

  Template.activityList.helpers({
    activities: function () {
      return Activities.find();
    }
  });

  Template.activitySubmit.events({
    "submit form": function (e) {
      e.preventDefault();

      var activity = {
        title: $("#activity-submit-title").val(),
        description: $("#activity-submit-description").val(),
        targets: $("#activity-submit-targets").val(),
        tags: $("#activity-submit-tags").val(),
        tutorial: $("#activity-submit-tutorial").val(),
        documents: $("#activity-submit-documents").val()
      };

      Activities.insert(activity);
    }
  });
}
