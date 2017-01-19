

import '../../api/lists/methods.js';
import '../components/list_overview.js';
import './mylists.html';


Template.mylists.helpers({
	buildDeleteButton(list) {
		if(list.editable) {
			return '<a href="#" class="delete_list" value="'+list._id+'" href="#">Supprimer</a>';
		}
		return null;
	}
});

Template.mylists.events({
	'submit .new_list_form': function(event) {
		event.preventDefault();
		let listName = $('.new_list_form .list_name').val();
		
		Meteor.call("buildNewList", listName, function(err, result){
			if(err) {
				console.log(err.reason);
			} else {
				$('.new_list_form .list_name').val("");
			}
		});
	},
	'click .delete_list': function(event) {
		Meteor.call("deleteList", $(event.target).attr("value"), function(err, result){
			if(err) {
				console.log(err.reason);
			}
		});
	}
});