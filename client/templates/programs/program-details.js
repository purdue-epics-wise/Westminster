Template.programDetails.helpers({
  owner() {
    const user = Meteor.users.findOne({
      _id: this.userId,
    });
    return user && user.profile;
  },
  activities() {
    if (this.activityIds) {
      const activities = Activities.find({
        _id: {
          $in: this.activityIds,
        },
      });
      return activities || [];
    }
  }
});
