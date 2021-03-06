
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { MDSnackbars } from 'meteor/255kb:md-snackbars';
import './login.html';
import './login.css';

Template.login.onRendered(function() {
	MDSnackbars.init();
});

Template.login.events({
	'submit .login_form'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		//Session.set("infoMessage", "Tentative de connexion...");

		let pseudo = $('.login_form .pseudo').val();
		let pwd = $('.login_form .password').val();

		Meteor.loginWithPassword(pseudo, pwd, function(err) {
			if(!err) {
				console.log("no error");
				Session.set("infoMessage", undefined);
				Router.go('home');
			}
			else {
				console.log("got error " + err.reason);
				Session.set("infoMessage", err.reason);
				MDSnackbars.show({
					text: err.reason,
					fullWidth: true,
					timeout: 3000,
					clickToClose: true,
					animation: 'slideup'
				});
			}
		});
	},

	'submit .register_form'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		Session.set("infoMessage", undefined);
		console.log("création du compte...");

		let pseudo = $('.register_form .pseudo').val();
		let email = $('.register_form .email').val();
		let pwd = $('.register_form .password').val();

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
				console.log("erreur:"+err.reason);
				Session.set("infoMessage", err.reason);
			}
		});

		var toastCopied = {
			content: Session.get("infoMessage"),
			style: "toast",
			timeout: 4000
		};
		var snackbar = $.snackbar(toastCopied);
		snackbar.snackbar("show");
	},

	'click .toggle'(event) {
		$('.container').stop().addClass('active');
	},

	'click .close'(event) {
		$('.container').stop().removeClass('active');
	}

});
