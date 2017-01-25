import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
	import '../../api/lists/server/lists_publications.js';
	import '../../api/search/methods.js';
	import './on_account_creation.js';
	//import './fake_imports.js';
});
