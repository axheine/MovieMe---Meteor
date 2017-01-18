import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
	import '../../api/lists/server/lists_publications.js';
	import './fake_imports.js';
});