var express = require ('express');
var router = express.Router();

var Leaderboard = require('../models/Leaderboard.js');

//Create a new Leaderboard: POST
router.post('/api/leaderboards', async function (req, res, next) {
    var leaderboard = new Leaderboard({
        leaderboard_id: req.body.leaderboard_id,
        month: req.body.month,
        squad: req.body.squad,
    });

    try {
        await leaderboard.save();
    } catch (err) {
        next(err);
    }  
    res.status(201).json(leaderboard);
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
    const leaderboard = await Leaderboard.findOne({leaderboard_id : leaderboard_id});
    if (!leaderboard){
        return res.status(404).json({"message": "No such Leaderboard"});
    }
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

//Partially Update a user (PATCH)


module.exports = router;