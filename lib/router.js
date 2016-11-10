Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function () {
    return [
      Meteor.subscribe("programs"),
      Meteor.subscribe("activities"),
      Meteor.subscribe("activityFiles"),
      Meteor.subscribe("users"),
    ];
  }
});

// General
Router.route('/', { name: 'welcome' });
Router.route('/faq', { name: 'faq' });

// Program
Router.route("/programs", { name: "programList" });
Router.route("/program/submit", { name: "programSubmit" });
Router.route('/program/favorites', { name: 'programFavorites' });
Router.route("/program/edit/:_id", {
  name: "programPage",
  waitOn: function () {
    return [Meteor.subscribe("programById", this.params._id)];
  },
  data: function () {
    return Programs.findOne(this.params._id);
  }
});
Router.route("/program/:_id", {
  name: "programDetails",
  waitOn: function () {
    return [Meteor.subscribe("programById", this.params._id)];
  },
  data: function () {
    return Programs.findOne(this.params._id);
  }
});

// Activity
Router.route("/activities", { name: "activityList" });
Router.route("/activity/submit", { name: "activitySubmit" });
Router.route('/activity/favorites', { name: 'activityFavorites' });
Router.route("/activity/edit/:_id", {
  name: "activityPage",
  waitOn: function () {
    return [Meteor.subscribe("activityById", this.params._id)];
  },
  data: function () {
    return Activities.findOne(this.params._id);
  }
});
Router.route("/activity/:_id", {
  name: "activityDetails",
  waitOn: function () {
    return [Meteor.subscribe("activityById", this.params._id)];
  },
  data: function () {
    return Activities.findOne(this.params._id);
  }
});

// Login
Router.route("/login", { name: "login" });
Router.route("/register", { name: "register" });

// Hooks
var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go("welcome");
    }
  } else {
    this.next();
  }
};

var accessDenied = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render("accessDenied");
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {
  only: [
    'programList',
    'activityList',
    'activityFavorites',
    'programFavorites',
    'programPage',
    'activityPage',
    'programDetails',
    'activityDetails',
    'welcome'
  ]
});
Router.onBeforeAction(accessDenied, { only: ["programSubmit", 'activitySubmit'] });
