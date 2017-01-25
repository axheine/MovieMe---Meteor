import { Template } from 'meteor/templating';

import '../components/navbar.js';

import './home.html';
import './home.css';

Template.home.events({
	'submit .logout_form' (event) {
		event.preventDefault();
		Meteor.logout();
	}
});
