var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var squadSchema = mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    leaderboard : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Leaderboard',
        unique : true
    }
});

var Squad = mongoose.model('Squads', squadSchema);

module.exports = Squad;