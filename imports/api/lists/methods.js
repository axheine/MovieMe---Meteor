
import './lists_definition.js';

Meteor.methods({
	buildNewList: function(name) {
		let newList = new List({user: Meteor.userId(), name: name, movies: [], editable: true});
		return newList.save();
	},
	
	deleteList: function(id) {
		let list = List.findOne({_id: id, user: Meteor.userId()});
		if(!list) {
			throw new Meteor.Error("list-delete-error", "No list belonging to this user is using this _id");
		}
		list.remove({_id: id, user: Meteor.userId()});
	}
});