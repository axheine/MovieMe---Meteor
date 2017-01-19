
import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser(function(options, user) {
	var userLikedMoviesList = new List({user: user._id, name: "Films que j'ai aimés", movies: [], editable: false});
	userLikedMoviesList.save();
	var userToBeWatchedMoviesList = new List({user: user._id, name: "Films à voir", movies: [], editable: false});
	userToBeWatchedMoviesList.save();
	
	console.log("Created new user");
	return user;
});