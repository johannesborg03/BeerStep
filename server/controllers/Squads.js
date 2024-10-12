var express = require('express');
var router = express.Router();

var Squad = require('../models/Squad.js');
var User = require('../models/User.js');
const Leaderboard = require('../models/Leaderboard');  
const { Types } = require('mongoose');


router.post('/api/squads', async function (req, res, next) {
    try {
        // Create the squad with the creator in users array
        const squad = new Squad({
            squadName: req.body.squadName,
            created_by: req.body.created_by, // Creator's ObjectId
            users: [req.body.created_by],    // Only the creator is added initially
            leaderboard: null                 // Temporary null, will assign the leaderboard later
        });

        // Save the squad to the database
        await squad.save();

        // Create the leaderboard without a squad reference
        const leaderboard = new Leaderboard({
            rankings: [] // Start with empty rankings
        });
        await leaderboard.save();

        // Update the squad with the created leaderboard's ID
        squad.leaderboard = leaderboard._id;
        await squad.save();

        // Update the creator's record by pushing the new squad's ID into the squads array
        const user = await User.findById(req.body.created_by);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the new squad ID to the user's squads array
        user.squads.push(squad._id);
        await user.save();

        
        res.status(201).json({ squad, leaderboard });
    } catch (err) {
        console.error('Error creating squad and updating user:', err);
        res.status(500).json({ message: "Error creating squad and updating user", error: err.message });
    }
});


// Add specific user to specific squad
router.patch('/api/squads/:id/users/:username', async function (req, res) {
    try {
        const squad_id = req.params.id;
        const username = req.params.username; 

        // Find the squad by its ID
        const squad = await Squad.findById(squad_id);
        if (!squad) {
            return res.status(404).json({ message: "Squad not found" });
        }

        // Find the user by their username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already part of the squad
        if (squad.users.includes(user._id)) {
            return res.status(400).json({ message: "User is already in the squad" });
        }

        // Add the user to the squad
        squad.users.push(user._id);
        await squad.save();

        // Add the squad to the user's list of squads
        user.squads.push(squad._id);
        await user.save();

        res.status(200).json({
            message: `User ${user.username} has been invited to the squad ${squad.squadName}.`,
            squad,
        });
    } catch (err) {
        res.status(500).json({ message: "Error inviting user", error: err.message });
    }
});

// Delete specific user from specific squad based on username
router.delete('/api/squads/:id/users/:username', async function (req, res, next) {
    try {
        const squad_id = req.params.id;
        const username = req.params.username;

        
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Find the squad by Id
        const squad = await Squad.findById(squad_id); // Find squad by name

        if(!squad) {
            return res.status(404).json({message: 'Squad not found'});
        }
        // Check if the user is part of the squad
        const userIndex = squad.users.indexOf(user._id);
        if (userIndex === -1) {
            return res.status(400).json({ message: 'User is not a member of this squad' });
        }
  
        // Remove the user from the squad
        squad.users.splice(userIndex, 1);
  
        // Remove the squad from the user's squads list
        const squadIdIndex = user.squads.indexOf(squad._id);
        if (squadIdIndex !== -1) {
            user.squads.splice(squadIdIndex, 1);
        } else {
            console.error('Squad not found in user\'s squads:', squad._id); // Debug: Log if squad ID is missing in user's squads
        }
  
        // Save the updated squad and user
        await Promise.all([squad.save(), user.save()]);
  
        console.log('User successfully removed from squad and squad removed from user\'s list'); // Debug: Log success
        return res.status(200).json({ message: 'User has left the squad' });
    } catch (error) {
        console.error('Error processing leave squad request:', error); // Debug: Log the error
        return res.status(500).json({ message: 'An error occurred while leaving the squad' });
    }
});

module.exports = router;