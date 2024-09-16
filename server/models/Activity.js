var mongoose = requrie('mongoose');

var Schema = mongoose.Schema;

var activitySchema = mongoose.Schema({


    activity_id : {
    type : String,
    unique : true,
    },
    beercount : {
        type : Integer,
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
        required : true
    }
});

var activity = mongoose.model('activities', activitySchema);

module.exports = activity;