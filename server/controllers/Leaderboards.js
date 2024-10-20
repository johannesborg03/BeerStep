var express = require ('express');
var router = express.Router();

var Leaderboard = require('../models/Leaderboard.js');
var User = require('../models/User.js');

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