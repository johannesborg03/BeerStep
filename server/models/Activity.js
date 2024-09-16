var mongoose = requrie('mongoose');

var Schema = mongoose.Schema;

var activitySchema = mongoose.Schema({


    Activity_id : {
    type : String,
    unique : true,
    },
    Beercount : {
        type : Integer,
        required : true,
        unique : false,
        min : 1,
        max : 30
    },
    Activity_type : {
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

var Activity = mongoose.model('Activities', activitySchema);

module.exports = Activity;