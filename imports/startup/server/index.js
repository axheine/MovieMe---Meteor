import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
	import '../../api/lists/server/lists_publications.js';
	import './on_account_creation.js';
	//import './fake_imports.js';
});