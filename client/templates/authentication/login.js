Template.login.events({
	"submit #login-form": function (e) {
		e.preventDefault();

		Meteor.loginWithPassword(
			{ email: $(e.target).find("#login-email").val() },
			$(e.target).find("#login-password").val(),
			function (error) {
				if (error) {
					$("#login-password").val("");
					$("#login-email").select();
					throwError("The email or password you entered is incorrect. Please try again.");
				} else {
					Router.go("welcome");
				}
			}
		);
	}
});
