var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var leaderboardSchema = new mongoose.Schema({
    rankings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            score: {
                type: Number,
                default: 0 // Default score can be 0 or undefined
            }
        }
    ],
    squad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Squad', 
        required: false 
    }
});

var Leaderboard = mongoose.model('Leaderboards', leaderboardSchema);
module.exports = Leaderboard;