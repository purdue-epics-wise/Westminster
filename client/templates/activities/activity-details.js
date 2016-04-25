var currentDocumentIds;
var currentDocuments = new ReactiveVar();
var activityFiles;

const data = new ReactiveVar();

Template.activityDetails.onRendered(function () {
  Session.set("documents-ready", false);
  activityFiles = this.data.documents;
  Session.set("documents-ready", true);

  Tracker.autorun(() => {
    if (this.data) data.set(this.data);
  });

  initIcons();
});

Template.activityDetails.helpers({
  documentRecords: function () {
    if (Session.get("documents-ready")) {
      var files = [];
      _.each(activityFiles, function (fileObj) {
        files.push(fileObj.getFileRecord());
      });
      return files;
    }
  },
  owner() {
    return data.get() && Meteor.users.findOne({
      _id: data.get().userId,
    }).profile;
  },
  modifiedTutorialLink() {
    return this.tutorialLink && getEmbedUrl(this.tutorialLink);
  },
});

Template.activityDetails.events({
  'click .favorite-icon': (e) => {
    $('.favorite-icon').toggleClass('favorited');

    const favorited = $('.favorite-icon').hasClass('favorited');
    Meteor.call('updateFavoriteActivity', data.get()._id, favorited, (error, result) => {
      if (error) return console.error(`Did not update favorites. Reason: ${error.reason}`);
      console.log(`Favorites: ${Meteor.user().profile.favoriteActivities}`);
    });
  }
});

function initIcons() {
  if (Meteor.user() && data.get()) {
    if (_.indexOf(Meteor.user().profile.favoriteActivities, data.get()._id) !== -1) {
      $('.favorite-icon').addClass('favorited');
    }
  }
}

function getEmbedUrl(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  const check = (match&&match[7].length==11)? match[7] : false;
  if (check) {
    return `https://www.youtube.com/embed/${check}`;
  }
  return check;
}
