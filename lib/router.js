Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function () {
    return [Meteor.subscribe("programs")];
  }
});

// Program
Router.route("/", { name: "programList" });
Router.route("/program/submit", { name: "programSubmit" });
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

// Front-End
Router.route("/front/articlePage", { name: "frontArticlePage" });
Router.route("/front/searchPage", { name: "frontSearchPage" });
Router.route("/front/landingPage", { name: "frontLandingPage" });

// Login
Router.route("/login", { name: "login" });
Router.route("/register", { name: "register" });

// Hooks
var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go("login");
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

Router.onBeforeAction(requireLogin, { only: "programList" });
Router.onBeforeAction(accessDenied, { only: "programSubmit" });