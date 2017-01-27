import './movie_overview.html';

Template.movie_overview.helpers({
    'buildPosterPath': function(path) {
        if(path) {
            return '<img class="poster" src="http://image.tmdb.org/t/p/w150'+path+'"/>';
        }
        return "";
    }
});
