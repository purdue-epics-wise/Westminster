Activities = new Mongo.Collection("activities");

ActivityIndex = new EasySearch.Index({
  collection: Activities,
  fields: ['title', 'tags'],
  engine: new EasySearch.Minimongo(),
});

if (Meteor.isServer) {

  Meteor.methods({
    insertActivity: function (activity) {
      check(activity, {
        title: String,
        description: String,
        brainTargets: [String],
        tags: [String],
        tutorialLink: String,
        documents: [FS.File],
        time: Number,
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
    updateActivity: function (activity, activityId, ownerId) {
      check(activity, {
        _id: String,
        title: String,
        description: String,
        brainTargets: [String],
        tags: [String],
        tutorialLink: String,
        documents: [FS.File],
        time: Number,
      });
      
      var user = Meteor.user();

      if (user._id != ownerId)
        throw new Meteor.Error("invalid-user", "User does not own this document.");

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
          tutorialLink: activity.tutorialLink,
          documents: activity.documents,
          time: activity.time,
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
    },
    updateFavoriteActivity(activityId, favorited) {
      check(activityId, String);
      check(favorited, Boolean);

      const user = Meteor.user();
      if (!user) throw new Meteor.Error('invalid-user', 'User does not exist.');

      let favorites = user.profile.favoriteActivities;
      if (favorited) {
        favorites = _.union(favorites, activityId);
      } else {
        favorites = _.difference(favorites, activityId);
      }

      Meteor.users.update({
        _id: user._id,
      }, {
        $set: {
          'profile.favoriteActivities': favorites,
        },
      });
    },
  });
  validateActivity = function (activity) {
    // TODO
    // DO NOT REMOVE THIS
    return {};
  }
}
