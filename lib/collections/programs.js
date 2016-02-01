Programs = new Mongo.Collection("programs");

/*Programs.allow({
  insert: function (program) {
    return true;
  },
  update: function (program) {
    return true;
  },
  remove: function (program) {
    return true;
  }
});*/

Meteor.methods({
  insertProgram: function (program) {
    check(program, {
      title: String,
      description: String,
      brainTargets: [String],
      tags: [String],
      documentLink: String,
      tutorialLink: String
    });

    var errors = validateProgram(program);
    if (_.size(errors) > 0)
      throw new Meteor.Error("invalid-program", errors)

    var newProgram = _.extend(program, {
      userId: Meteor.userId(),
      created: new Date()
    });

    var programId = Programs.insert(newProgram);

    return { _id: programId };
  },
  updateProgram: function (program) {
    check(program, {
      _id: String,
      title: String,
      description: String,
      brainTargets: [String],
      tags: [String],
      documentLink: String,
      tutorialLink: String,
      userId: String
    });

    if (program.userId != Meteor.userId())
      throw new Meteor.Error("invalid-user", "User does not own document.");

    var errors = validateProgram(program);
    if (_.size(errors) > 0)
      throw new Meteor.Error("invalid-program", errors);

    var affected = Programs.update({
			_id: program._id
		}, {
			$set: {
        title: program.title,
        description: program.description,
        brainTargets: program.brainTargets,
        tags: program.tags,
        documentLink: program.documentLink,
        tutorialLink: program.tutorialLink
      }
		});

    if (!affected)
      throw new Meteor.Error("invalid-program", "Could not find Program to update.");

    return { _id: program._id };
  },
  deleteProgram: function (programId, ownerId) {
    check(programId, String);
    check(ownerId, String);

    var user = Meteor.user();

    if (user._id != ownerId)
      throw new Meteor.Error("invalid-user", "User does not own this document.");

    try {
      Programs.remove(programId);
    } catch (ex) {
      throw new Meteor.Error("invalid-program", "Could not delete program.");
    }
  }
});

var validateProgram = function (program) {
  // TODO
  return {};
}
