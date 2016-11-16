
if (Meteor.isServer) {

  Meteor.startup(function () {
  smtp = {
    username: 'WestminsterWLTest@gmail.com',   // sender account
    password: 'PurdueEPICS',   				   // sender account password
    server:   'smtp.gmail.com',  			   // mail server based on sender account
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

  Meteor.methods({
  	sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    //actual email sending method
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }

  });
}