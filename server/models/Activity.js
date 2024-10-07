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

// Method for logging a beer and automatically adding 2000 steps to steps needed
activitySchema.methods.logBeer = function(beerCount) {
    this.total_beers += beerCount;
    this.steps_needed += beerCount * 2000;
    return this.save();
};

activitySchema.methods.logSteps = function(steps) {
    this.total_steps += steps;
    if(this.steps_needed > 0) {
        this.steps_needed = Math.max(0, this.steps_needed - steps);
    }
    return this.save();
};



var Activity = mongoose.model('activities', activitySchema);

module.exports = Activity;