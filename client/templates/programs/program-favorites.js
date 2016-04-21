Template.programFavorites.helpers({
  activities() {
    return Meteor.user() && Programs.find({
      _id: {
        $in: Meteor.user().profile.favoritePrograms,
      },
    });
  },
});
