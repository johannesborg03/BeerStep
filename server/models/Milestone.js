const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    username : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
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
   

const Milestone = mongoose.model('Milestone', milestoneSchema);
module.exports = Milestone;