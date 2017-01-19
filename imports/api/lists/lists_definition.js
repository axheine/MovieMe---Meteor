

/*
Ce fichier définit ce qu'est une List. La définition des méthodes associées est donnée dans un fichier à
part et importée ici. De cette manière, les deux parties connaissent les méthodes si elles importent la
classe.
*/

import { Class } from "meteor/jagi:astronomy";

List = Class.create({
	name: 'List',
	collection: new Mongo.Collection('lists'),
	fields: {
		user: String,
		name: String,
		movies: [String],
		editable: Boolean
	}
});


import './methods.js';