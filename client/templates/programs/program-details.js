const activityIds = new ReactiveVar();

Template.programDetails.onRendered(() => {
  Tracker.autorun(() => {
    if (this.activityIds) activityIds.set(this.activityIds);
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
