
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './login.html';



Template.login.events({
	'submit .login_form'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		Session.set("infoMessage", undefined);

		let pseudo = $('.login_form > .pseudo').val();
		let pwd = $('.login_form > .password').val();
		
		Meteor.loginWithPassword(pseudo, pwd, function(err) {
			if(!err) {
				Router.go('home');
			}
			else {
				Session.set("infoMessage", err.reason);
			}
		});
	},

	'submit .register_form'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		Session.set("infoMessage", undefined);

		let pseudo = $('.register_form > .pseudo').val();
		let email = $('.register_form > .email').val();
		let pwd = $('.register_form > .password').val();

		let userInfos = {
			username: pseudo,
			password: pwd,
			email: email
		};

		Accounts.createUser(userInfos, function(err) {
			if(!err) {
				Router.go('home');
			}
			else {
				Session.set("infoMessage", err.reason);
			}
		});
	}
});