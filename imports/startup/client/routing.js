
import { Meteor } from 'meteor/meteor';


hasLikedEnoughMovies = function(user) {
	return true;
}

/* Controleur standard qui fait les vérifications de base:
- redirection vers l'accueil si pas loggé
- redirection vers la proposition de film si moins de 10 films aimés

On peut se le permettre vu que ce sont les seules vérifications à faire, et qu'elles sont globales
sur toute l'application
*/

ApplicationController = RouteController.extend({
	onBeforeAction: function() {
		var user = Meteor.user();
		// pas loggé
		if(!user) {
			console.log("Redirection to login page...");
			this.render('login');
		}
		// Pas liké assez de films
		else if(!hasLikedEnoughMovies(user)) {
			this.render('proposeMovie');
		}
		else {
			this.next();
		}
	}
});


/*
Configuration globale du routeur : on définit le controlleur par défaut pour toute route
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


// Affichage d'une liste (dont films aimés? Peut-être une route à part)
Router.route('/list/:_id', {
	name: 'showlist',
	action: function() {
		this.render('showlist');
	}
});