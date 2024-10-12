var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var squadSchema = new mongoose.Schema({
    squadName : {
        type : String,
        required : true,
        unique : true,
        min : 1,
        max : 25
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
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
        unique: false
    }
});

var Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;