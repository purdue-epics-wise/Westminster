Programs = new Mongo.Collection("programs");

if (Meteor.isServer) {

  Meteor.methods({
    insertProgram: function (program) {
      check(program, {
        title: String,
        description: String,
        activityIds: [String],
        tags: [String],
        tutorialLink: String
      });

      var user = Meteor.user();
      if (!user)
          throw new Meteor.Error('invalid-user', 'Must be a user to create a program.');
    
      var errors = validateProgram(program);
      if (_.size(errors) > 0)
        throw new Meteor.Error("invalid-program", errors)

      var brainTargets = getBrainTargets(program.activityIds);

      var newProgram = _.extend(program, {
        brainTargets: brainTargets,
        userId:user._id,
        community: user.profile.community,
        name: user.profile.fullName,
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
        activityIds: [String],
        //brainTargets: [String],
        tags: [String],
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
          activityIds: program.activityIds,
          //brainTargets: program.brainTargets,
          tags: program.tags,
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
    },
    updateFavoriteProgram(programId, favorited) {
      check(programId, String);
      check(favorited, Boolean);

      const user = Meteor.user();
      if (!user) throw new Meteor.Error('invalid-user', 'User does not exist.');

      let favorites = user.profile.favoritePrograms;
      if (favorited) {
        favorites = _.union(favorites, programId);
      } else {
        favorites = _.difference(favorites, programId);
      }

      Meteor.users.update({
        _id: user._id,
      }, {
        $set: {
          'profile.favoritePrograms': programs,
        },
      });
    }
  });

  var getBrainTargets = function (activityIds) {
    var activities = Activities.find({
      _id: { $in: activityIds }
    }).fetch();

    console.log(activities);

    var brainTargets = [];
    _.each(activities, function (activity) {
      brainTargets = _.union(brainTargets, activity.brainTargets);
    });

    return brainTargets;
  };

  var validateProgram = function (program) {
    // TODO
    return {};
  }


}
