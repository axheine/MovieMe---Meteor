
import { Meteor } from 'meteor/meteor';
import { Router, RouteController } from 'meteor/iron:router';
import '../../api/lists/lists_definition.js';
import '../../api/lists/cachedmovies_definition.js';

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
		if(!this.ready() || Meteor.loggingIn()) {
			this.next();
			//this.render('loading');
		}
		else {
			var user = Meteor.user();
			// pas loggé
			if(!user) {
				//console.log("Redirection to login page...");
				this.render('login', {message: "Loggez vous"});
			}
			// Pas liké assez de films
			else if(!hasLikedEnoughMovies(user)) {
				this.render('proposeMovie');
			}
			else {
				this.next();
			}
		}
	}
});

/*
Configuration globale du routeur : on définit le controlleur par défaut pour toute route
*/
Router.configure({
	controller: 'ApplicationController',
	notFoundTemplate: 'notFoundTemplate'
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
	subscriptions: function() {
		return Meteor.subscribe("user-lists", Meteor.userId());
	},
	data: function() {
		return {
			userLists: List.find({user: Meteor.userId()})
		};
	},
	action: function() {
		this.render('mylists');
	}
});


// Recherche
Router.route('/search', {
	name: 'search',
	/*subscriptions: function() {
		return true;
	},*/
	action: function() {
		this.render('search');
	}
});


// Affichage d'une liste (dont films aimés? Peut-être une route à part)
Router.route('/list/:_id', {
	name: 'showlist',
	action: function() {
		this.render('showlist');
	}
});