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
    //Activity Related Fields
    total_beers: {
        type: Number,
        default: 0,
        min: 0
    },
    total_steps: {
        type: Number,
        default: 0,
        min: 0
    },
    steps_needed: {
        type: Number,
        default: 0,
        min: 0
    },
    milestones : [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Milestone'      // Reference to squads
    }],

}); 


var User = mongoose.model('User', userSchema);
module.exports = User;
 



