
import { Class } from "meteor/jagi:astronomy";

CachedMovie = Class.create({
	name: 'CachedMovie',
	collection: new Mongo.Collection('cachedmovies'),
	fields: {
		movieId: Number,
		description: String,
		urlPart: String
	}
});