Template.activityFavorites.helpers({
  activities() {
    return Meteor.user() && Activities.find({
      _id: {
        $in: Meteor.user().profile.favoriteActivities,
      },
    });
  },
});
