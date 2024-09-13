var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var leaderboardSchema = mongoose.Schema({
    leaderboard_id : {
        type : String,
        required : true,
        unique : true
    },
    month : {
        type : String,
        required : true,
        min : 3,
        max : 20
    }
});

var Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);