const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title : {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    description: {
        type: String,
        required: false,
        min: 3,
        max: 150
    },
    beers: {
        type: Number,
        required: false,
        min: 0
    },
    steps: {
        type: Number,
        required: false,
        min: 0
    }

});
   

const Milestone = mongoose.model('Milestone', MilestoneSchema);
module.exports = Milestone;