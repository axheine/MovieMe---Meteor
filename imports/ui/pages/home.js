


import './home.html';

Template.home.events({
	'submit .logout_form' (event) {
		event.preventDefault();
		Meteor.logout();
	}
});