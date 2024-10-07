var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Make it required to associate activity with a user
    },
    total_beers: {
        type: Number,
        required: true,
        default: 0, // Initial value is 0
        min: 0
    },
    total_steps: {
        type: Number,
        required: true,
        default: 0, // Initial value is 0
        min: 0
    },
    steps_needed: {
        type: Number,
        required: true,
        default: 0, // Steps needed starts at 0 but will increase as beers are logged
        min: 0
    }
});

var Activity = mongoose.model('activities', activitySchema);

module.exports = Activity;