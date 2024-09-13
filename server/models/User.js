var mongoose = require('mongoose');

var Schema = mongoose.Schema;



//Connect to MongoDB:
mongoose.connect(
    'mongodb://localhost:27017/beerStepDB'
);

var userSchema = new moongose.Schema({
    userID : {
        type : String,
        required : true,
        unique : true
    },

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
    }
});

var User = mongoose.model('User', userSchema);

 



