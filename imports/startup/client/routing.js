
import { Meteor } from 'meteor/meteor';


hasLikedEnoughMovies = function(user) {
	return true;
}

/* Controleur standard qui fait les v�rifications de base:
- redirection vers l'accueil si pas logg�
- redirection vers la proposition de film si moins de 10 films aim�s

On peut se le permettre vu que ce sont les seules v�rifications � faire, et qu'elles sont globales
sur toute l'application
*/

ApplicationController = RouteController.extend({
	onBeforeAction: function() {
		var user = Meteor.user();
		// pas logg�
		if(!user) {
			console.log("Redirection to login page...");
			this.render('login');
		}
		// Pas lik� assez de films
		else if(!hasLikedEnoughMovies(user)) {
			this.render('proposeMovie');
		}
		else {
			this.next();
		}
	}
});


/*
Configuration globale du routeur : on d�finit le controlleur par d�faut pour toute route
*/
Router.configure({
	controller: 'ApplicationController'
});


// Accueil
Router.route('/', {
	name: 'home',
	action: function() {
		this.render('home');
	}
});


// Login/rgister
Router.route('/login', {
	name: 'login',
	action: function() {
		this.render('login');
	}
});


// Proposition de film
Router.route('/proposeMovie', {
	name: 'proposeMovie',
	action: function() {
		this.render('proposeMovie');
	}
});


// Affichage "mes listes"
Router.route('/mylists', {
	name: 'mylists',
	action: function() {
		this.render('mylists');
	}
});


// Affichage d'une liste (dont films aim�s? Peut-�tre une route � part)
Router.route('/list/:_id', {
	name: 'showlist',
	action: function() {
		this.render('showlist');
	}
});