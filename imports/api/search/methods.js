
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

var api_key = "e840b239578a7f7d833e52dbf8ae4ad6";

Meteor.methods({
	//Méthode appelant l'api pour une recherhe par nom de film
	'search-movies': function(searchString) {
		//Session.set("search", null);
		var query_params = {
			"api_key": api_key,
			"language": "fr", //TODO: proposer un autre language dans les paramètres?
			"include_adult": "false", //TODO: proposer true dans les paramètres?
			"query": searchString
		};
		console.log("method called");
		var result = HTTP.call('GET', 'http://api.themoviedb.org/3/search/movie', {params: query_params}, function(error, result) {
			if(error) {
				console.log("error" + error);
			} else {
				console.log(result.data.results);
				return result.data.results;
			}
		});
		console.log('server result' + result);
		return result;
	},

	//Méthode appelant l'api pour une recherche par genre, le résultat est demandé par popularité décroissante
	'search-movies-by-categories': function(searchString) {
		var params = {
	    	"api_key": api_key,
	   		"language": "fr",
			"sort_by": "popularity.desc",
	   		"include_adult": "false",
			"with_genres": searchString,
		};

		var api_call_result = HTTP.call( 'GET', "http://api.themoviedb.org/3/discover/movie", {params: params});
		return api_call_result.data.results;
	},

	//Méthode retournant le détail pour un id de film donné
	'get-movie-detail': function(movieId){
		var api_call_result = HTTP.call(
			'GET', "https://api.themoviedb.org/3/movie/" + movieId, {
	  			params: {
	    			"api_key": api_key,
	    			"language": "fr"
	  			}
			});

		return api_call_result.data;
	}
});
