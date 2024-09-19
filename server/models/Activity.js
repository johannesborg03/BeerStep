var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var activitySchema = mongoose.Schema({

    beercount : {
        type : Number,
        required : true,
        unique : false,
        min : 1,
        max : 30
    },
    activity_type : {
    type : String,
    unique : false,
    required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : false
    }
});

var Activity = mongoose.model('activities', activitySchema);

module.exports = Activity;