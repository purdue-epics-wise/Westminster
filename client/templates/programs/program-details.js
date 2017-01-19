const activityIds = new ReactiveVar();
const data = new ReactiveVar(); //THIS DATA IS NOT DEFINED RIPERINO

Template.programDetails.onRendered(() => {
  Tracker.autorun(() => {
    if (this.activityIds) activityIds.set(this.activityIds);
    if (this.data) data.set(this.data);
  });
});

Template.programDetails.helpers({
  owner() {
    const user = Meteor.users.findOne({
      _id: this.userId,
    });
    return user && user.profile;
  },
  activities() {
    return this.activityIds && Activities.find({
      _id: {
        $in: this.activityIds,
      },
    }) || [];
  }
});

Template.programDetails.events({
  'click .favorite-icon': (e) => {
    $('.favorite-icon').toggleClass('favorited');

    const favorited = $('.favorite-icon').hasClass('favorited');
    Meteor.call('updateFavoriteProgram', data.get()._id, favorited, (error, result) => {
      if (error) return console.error(`Did not update favorites. Reason: ${error.reason}`);
      console.log(`Favorites: ${Meteor.user().profile.favoritePrograms}`);
    });
  }
});

function initIcons() {
  if (Meteor.user() && data.get()) {
    if (_.indexOf(Meteor.user().profile.favoritePrograms, data.get()._id) !== -1) {
      $('.favorite-icon').addClass('favorited');
    }
  }
}
