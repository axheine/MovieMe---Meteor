import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import './navbar.html';
import './navbar.css';


Template.navbar.helpers({
    userName: function() {
        if(Meteor.user())
            return Meteor.user().username;
    }
});

Template.navbar.onCreated(function(){

});

Template.navbar.events({
    'focusin .search-textbox'(event) {
        if(event.target.val <= 0){
            var parent = $('.search');
            console.log(parent);
            parent.addClass('focused');
        }
    },

    'focusout .search-textbox'(event) {
        if(event.target.val <= 0){
            var parent = $('div.search');
            console.log(parent);
            parent.removeClass('focused');
        }
    },

    'click .search'(event) {
        $('input.search-textbox').focus();
    },

    'keyup .search-textbox'(event, currentTemplate) {
        var parent = $('div.search');
        var elem = $(event.target);
        var search = elem.val(),
            search_length = search.length;

        if(search_length >= 2){
            parent.addClass('multi-char');
            if(!parent.hasClass('not-null')){
                parent.addClass('not-null');
            }
            //TODO: Call server ici

            Meteor.call("search-movies", search, function(error, result){
                if(error){
                    console.log("error", error);
                }
                if(result){
					try{
						console.log("client get results!");
                        console.log(result);
						//currentTemplate.data.resultStorage.set("réponse reçue");
						currentTemplate.data.resultStorage.set(result);
					}
					catch(e){
						console.log("exception: ", e);
					}
                }
            });

        }
        else if(search_length == 1){
            parent.addClass('not-null');
            parent.removeClass('multi-char');
        }
        else if(search_length <= 0){
            parent.removeClass('not-null');
            parent.removeClass('multi-char');
        }
    },

    'click .logout'(event) {
		event.preventDefault();
		Meteor.logout();
	}
});
