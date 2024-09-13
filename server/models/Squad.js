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
    }

});

var Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;