var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username : { 
        type : String,
        required : true,
        min : 3,
        max : 12,
        unique : true
        
    },
    email : {
        type : String,
        required : true,
        min : 4,
        max : 30,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 4,
        max : 20,
        unique : false,
    },
    squads : [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Squad'      // Reference to squads
    }],
    activities: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Activity'  // One-to-many relationship with Activity
    }]

}); 


var User = mongoose.model('User', userSchema);
module.exports = User;
 



