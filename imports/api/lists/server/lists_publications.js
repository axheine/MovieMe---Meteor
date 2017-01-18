
import '../lists_definition.js';

Meteor.publish("user-lists", function(userId) {
	return List.find({user: userId});
});