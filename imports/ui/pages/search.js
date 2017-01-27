import { Template } from 'meteor/templating';

import '../components/navbar.js';

import '../components/search_result_overview.js'

import './search.html';


Template.search.onCreated(function(){
	this.resultStorage = new ReactiveVar([]);
	console.log("Built resultStorage");
	console.log(this);
});

Template.search.helpers({
	'getResultStorage': function(){
		console.log("in helper");
		console.log(Template.instance());
		//Template.instance().resultStorage = new ReactiveVar([]);
		return Template.instance().resultStorage;
	}
});
