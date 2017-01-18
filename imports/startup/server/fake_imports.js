
import '../../api/lists/lists_definition.js';

console.log("running fake imports...");
List.remove({});
var id = Meteor.users.findOne()._id;

var l1 = new List({user: id, name:"Liste 1", movies: []});
l1.save();

var l2 = new List({user: id, name:"Liste 2", movies: []});
l2.save();

console.log("done.");