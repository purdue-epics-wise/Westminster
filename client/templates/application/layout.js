Template.layout.events({
  "click #logout-button": function (e) {
    e.preventDefault();

    Meteor.logout(function (error) {
			if (error) {
				alert("We could not log you out at the moment. Please try again later.");
			} else {
				Router.go("login");
			}
		});
  }
});

Template.layout.helpers({
  showBackground: function () {
    var currentRoute = Router.current().route.getName();
    return currentRoute == "login" || currentRoute == "register";
  }
})
