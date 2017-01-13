import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

Template.registerHelper("setTitle", function(title){
	if(title){
		document.title = title;
	}
	else{
		console.log("setTitle called without title!");
	}
});


Template.registerHelper("getInfoMessage", function() {
	return Session.get("infoMessage");
});