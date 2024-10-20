var express = require ('express');
var router = express.Router();

var Leaderboard = require('../models/Leaderboard.js');
var User = require('../models/User.js');

//Create a new Leaderboard: POST
router.post('/api/leaderboards', async function (req, res, next) {
    try {
        if (!req.body.squad) {
            return res.status(400).json({
                message: 'Squad field is required.'
            });
        }
    var leaderboard = new Leaderboard({
        leaderboard_id: req.body.leaderboard_id,
        month: req.body.month,
        squad: req.body.squad,
    });

        await leaderboard.save();
        res.status(201).json(leaderboard);
    } catch (err) {
        // Check if the error is a duplicate key error (E11000)
        if (err.code === 11000) {
            let duplicateField = Object.keys(err.keyValue)[0]; // Find the field that caused the duplicate error
            return res.status(409).json({
                message: `A leaderboard with the same ${duplicateField} already exists.`,
                field: duplicateField
            });
        }

        // Catch validation or other errors
        res.status(500).json({
            message: 'Server error while creating leaderboard',
            error: err.message
        });
    }
});


//Get all Leaderboards (GET)
router.get('/api/leaderboards', async function (req, res, ){
    const leaderboards = await Leaderboard.find();
    res.json({'leaderboards': leaderboards});
});


//Get specific Leaderboards (GET)
router.get('/api/leaderboards/:leaderboard_id', async function (req, res) {
    try{
    var leaderboard_id = req.params.leaderboard_id;
    const leaderboard = await Leaderboard.findById(leaderboard_id).populate('rankings.userId', 'username');
    if (!leaderboard){
        return res.status(404).json({"message": "No such Leaderboard"});
    }
    leaderboard.calculateScores();
    console.log(leaderboard);
    res.json(leaderboard);
} catch (err) {
    res.status(500).json({"message" : "Server error", "error": err.message});
}
});


//Update a Leaderboard (PUT)
router.put('/api/leaderboards/:leaderboard_id', async function (req, res)  {
    try{
        var leaderboard_id = req.params.leaderboard_id;
        const updatedData = req.body;
        const updatedLeaderboard = await Leaderboard.findOneAndUpdate({leaderboard_id : leaderboard_id}, updatedData, 
            {new: true, runValidators: true}
        );
        if (!updatedLeaderboard){
            return res.status(404).json({"message": "No such Leaderboard"});
        }
        res.json(updatedLeaderboard);
    } catch (err) {
        res.status(500).json({"message" : "Server error", "error": err.message});
    }
    });

//Delete a specific Leaderboard (DELETE)
router.delete('/api/leaderboards/:leaderboard_id', async function (req, res) {
    try {
    var leaderboard_id = req.params.leaderboard_id;
    const deletedLeaderboard = await Leaderboard.findOneAndDelete({leaderboard_id: leaderboard_id});
    if(!deletedLeaderboard) {
        return res.status(404).json({"message": "No such Leaderboard"});
}
    res.json({ "message": "Leaderboard deleted successfully", "leaderboard" : deletedLeaderboard});
} catch (err) {
    res.status(500).json({"message" : "Server error", "error" : err.message});
}
});

//
//Delete all Leaderboards (DELETE)
router.delete('/api/leaderboards', async function (req, res) {
    try {
        const deletedResult = await Leaderboard.deleteMany({});
        res.status(200).json({
            message: "All leaderboards succesfully deleted",
            deletedCount: deletedResult.deletedCount,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error while deleting leaderboards",
            error: err.message,
        });
    }
});

//Partially Update a leaderboard (PATCH)
router.patch('/api/leaderboards/:leaderboard_id', async function (req, res) {
    try {
        const leaderboard_id = req.params.leaderboard_id;

        const updatedLeaderboard = await Leaderboard.findOneAndUpdate(
            {leaderboard_id: leaderboard_id},
            { $set: req.body },
            {new: true, runValidators: true} //Return the updated documents and run schema validators
        );
        if (!updatedLeaderboard) {
            return res.status(404).json({message: "Leaderboard not found"});
        }
        res.status(200).json(updatedLeaderboard);
    } catch (err){
        res.status(500).json({
            message: "Server error while updating the Leaderboard",
            error: err.message,
        });
    }
});

// GET leaderboard for all users
router.get('/api/leaderboards/type/global', async (req, res) => {
    try {
        // Fetch all users with total_steps and total_beers fields
        const users = await User.find({}, 'username total_steps total_beers').exec();

        // Map over the users to calculate their scores and sort them
        const leaderboard = users
            .map(user => {
                
                console.log(`Calculating score for user: ${user.username}, total_steps: ${user.total_steps}, total_beers: ${user.total_beers}`);
                
                const totalSteps = user.total_steps || 0; 
                const totalBeers = user.total_beers || 0; 
                const score = totalSteps - totalBeers * 100;

                // Log the calculated score
                console.log(`User: ${user.username}, Score: ${score}`);

                return {
                    username: user.username,
                    score: score
                };
            })
            .sort((a, b) => b.score - a.score); 
        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching global leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

module.exports = router;