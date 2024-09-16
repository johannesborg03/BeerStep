var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var squadSchema = mongoose.Schema({
    squad_id : {
        type : String,
        required : true,
        unique : true
    },
    squadName : {
        type : String,
        required : true,
        unique : false,
        min : 1,
        max : 25
    },
    created_by : {
        type : String,
        required : true,
        unique : false
    },
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'  // Reference to users
    }] 

});

var Squad = mongoose.model('Squads', squadSchema);

module.exports = Squad;