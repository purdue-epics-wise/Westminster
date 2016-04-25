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
  },
  modifiedTutorialLink() {
    return this.tutorialLink && getEmbedUrl(this.tutorialLink);
  },
});

function getEmbedUrl(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  const check = (match&&match[7].length==11)? match[7] : false;
  if (check) {
    return `https://www.youtube.com/embed/${check}`;
  }
  return check;
}
