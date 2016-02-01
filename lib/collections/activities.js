Activities = new Mongo.Collection("activities");

if (Meteor.isServer) {

  /*Activities.allow({
    insert: function (activity) {
      return true;
    },
    update: function (activity) {
      return true;
    },
    remove: function (activity) {
      return true;
    }
  });*/

  Meteor.methods({
    insertActivity: function (activity) {
      check(activity, {
        title: String,
        description: String,
        brainTargets: [String],
        tags: [String],
        documentLink: String,
        tutorialLink: String
      });

      var errors = validateActivity(activity);
      if (_.size(errors) > 0)
        throw new Meteor.Error("invalid-activity", errors);

      var newActivity = _.extend(activity, {
        userId: Meteor.userId(),
        created: new Date()
      });

      var activityId = Activities.insert(newActivity);

      return { _id: activityId };
    },
    updateActivity: function (activity) {
      check(activity, {
        _id: String,
        title: String,
        description: String,
        brainTargets: [String],
        tags: [String],
        documentLink: String,
        tutorialLink: String,
        userId: String
      });

      if (activity.userId != Meteor.userId())
        throw new Meteor.Error("invalid-user", "User does not own document.");

      var errors = validateActivity(activity);
      if (_.size(errors) > 0)
        throw new Meteor.Error("invalid-activity", errors);

      var affected = Activities.update({
  			_id: activity._id
  		}, {
  			$set: {
          title: activity.title,
          description: activity.description,
          brainTargets: activity.brainTargets,
          tags: activity.tags,
          documentLink: activity.documentLink,
          tutorialLink: activity.tutorialLink
        }
  		});

      if (!affected)
        throw new Meteor.Error("invalid-activity", "Could not find Activity to update.");

      return { _id: activity._id };
    },
    deleteActivity: function (activityId, ownerId) {
      check(activityId, String);
      check(ownerId, String);

      var user = Meteor.user();

      if (user._id != ownerId)
        throw new Meteor.Error("invalid-user", "User does not own this document.");

      try {
        Activities.remove(activityId);
      } catch (ex) {
        throw new Meteor.Error("invalid-activity", "Could not delete program.");
      }
    }
  });

  validateActivity = function (activity) {
    // TODO
    return {};
  }


}
