Template.welcome.events({
	activityCreateFunc: function (e) {
		Router.go("activitySubmit");
	},

	activityBrowseFunc: function (e) {
		Router.go("activityList");
	},

	programBrowseFunc: function (e) {
		Router.go("programList");
	},

	programCreateFunc: function (e) {
		Router.go("programSubmit");
	}
});