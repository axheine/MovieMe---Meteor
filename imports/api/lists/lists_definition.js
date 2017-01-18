
import { Class } from "meteor/jagi:astronomy";

List = Class.create({
	name: 'List',
	collection: new Mongo.Collection('lists'),
	fields: {
		user: String,
		name: String,
		movies: [String]
	}
});