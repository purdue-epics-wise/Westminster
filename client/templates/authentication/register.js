Template.register.events({
	"submit #register-form": function (e) {
		e.preventDefault();

		var errors = validateUser(e);
		if (errors && errors.reason)
			return alert(errors.reason);

		Accounts.createUser({
			email: $(e.target).find("#register-email").val(),
			password: $(e.target).find("#register-password").val(),
			profile: {
				fullName: $(e.target).find("#register-full-name").val(),
				community: $(e.target).find("#register-community").val(),
				favoriteActivities: [],
				favoritePrograms: [],
			}
		}, 

		function (error) {
			if (error) {
				alert("There was an error creating your account. Please try again later.");
			} else {
				Router.go("welcome");
			}
		},
		Meteor.call(
			'sendEmail',
			'WestminsterWLTest@gmail.com',
			'WestminsterWLTest@gmail.com',
			'An account was created!',
			'Account created by ' + $(e.target).find("#register-full-name").val() + '.'
		)
		);
	}
});

var validateUser = function (e) {
	var fullName = $(e.target).find("#register-full-name").val();
	if (fullName.length < 2 || (fullName.indexOf(" ") < 0))
		return { reason: "You must enter a Full Name." };
}
