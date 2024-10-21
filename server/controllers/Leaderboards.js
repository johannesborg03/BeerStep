var express = require ('express');
var router = express.Router();

var Leaderboard = require('../models/Leaderboard.js');
var User = require('../models/User.js');
//Get specific Leaderboards (GET)
router.get('/api/leaderboards/:leaderboard_id', async function (req, res) {
    try{
    var leaderboard_id = req.params.leaderboard_id;
    const leaderboard = await Leaderboard.findById(leaderboard_id).populate('rankings.userId', 'username total_beers');
    if (!leaderboard){
        return res.status(404).json({"message": "No such Leaderboard"});
    }
    leaderboard.calculateScores();



    console.log(leaderboard);



        // Construct the response object
        const response = {
            rankings: leaderboard.rankings.map(ranking => ({
                user: ranking.userId.username,
                score: ranking.score,
                beers: ranking.userId.total_beers // Provide a default value if total_beers is undefined
            }))
        };

        console.log(response); // Log the response for debugging
        return res.json(response); // Use return to prevent further execution

/*
    res.json({
        rankings: leaderboard.rankings.map(ranking => ({
          user: ranking.userId.username,
          score: ranking.score,
          beers: ranking.userId.total_beers // Send beers to frontend
        }))
        
      });
      console.log(response); // Log the response for debugging
      */
    }  catch (err) {
    res.status(500).json({"message" : "Server error", "error": err.message});
}
});



// Get Leaderboards (both global and all leaderboards)
router.get('/api/leaderboards', async (req, res) => {
    try {
        
        const isGlobal = req.query.global === 'true';

        if (isGlobal) {

            const users = await User.find({}, 'username total_steps total_beers').exec();

            const leaderboard = users
                .map(user => {
                    const totalSteps = user.total_steps || 0; 
                    const totalBeers = user.total_beers || 0; 
                    const score = totalSteps - totalBeers * 100;

                    return {
                        username: user.username,
                        score: score,
                        beers: totalBeers,
                    };
                })
                .sort((a, b) => b.score - a.score); // Sort by score in descending order

            res.json({ leaderboard: leaderboard });
        } else {
            // Fetch all leaderboards from the Leaderboard collection
            const leaderboards = await Leaderboard.find();
            res.json({ leaderboards: leaderboards });
        }
    } catch (error) {
        console.error('Error fetching leaderboards:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboards' });
    }
});

module.exports = router;