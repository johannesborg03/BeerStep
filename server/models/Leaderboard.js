var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var leaderboardSchema = mongoose.Schema({
    leaderboard_id : {
        type : Number,
        required : true,
        unique : true
    },
    month : {
        type : String,
        required : true,
        min : 3,
        max : 20
    },
    squad : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Squad' 
    }
});

var Leaderboard = mongoose.model('Leaderboards', leaderboardSchema);

module.exports = Leaderboard;