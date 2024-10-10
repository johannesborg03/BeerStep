var express = require('express');
var router = express.Router();

var Squad = require('../models/Squad.js');
var User = require('../models/User.js');
const Leaderboard = require('../models/Leaderboard');  


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


router.get('/api/squads/:squad_id', async function (req, res, next) {
    try {
        const squad = await Squad.findOne({ squad_id: req.params.squad_id }).populate('users').populate('leaderboard');
        if (!squad) {
            return res.status(404).json({ message: "Squad not found" });
        }
        res.json(squad);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving squad", error: err.message });
    }
});


router.put('/api/squads/:squad_id', async function (req, res, next) {
    try {
        const updatedSquad = await Squad.findOneAndUpdate(
            { squad_id: req.params.squad_id },
            req.body,
            { new: true, runValidators: true }
        ).populate('users').populate('leaderboard');
        
        if (!updatedSquad) {
            return res.status(404).json({ message: "Squad not found" });
        }
        res.json(updatedSquad);
    } catch (err) {
        res.status(500).json({ message: "Error updating squad", error: err.message });
    }
});


router.patch('/api/squads/:squad_id', async function (req, res, next) {
    try {
        const updatedSquad = await Squad.findOneAndUpdate(
            { squad_id: req.params.squad_id },
            { $set: req.body },
            { new: true, runValidators: true }
        ).populate('users').populate('leaderboard');
        
        if (!updatedSquad) {
            return res.status(404).json({ message: "Squad not found" });
        }
        res.status(200).json(updatedSquad);
    } catch (err) {
        res.status(500).json({ message: "Error updating squad", error: err.message });
    }
});

router.post('/api/squads/:squad_id/invite', async function (req, res) {
    try {
        const { squad_id } = req.params;
        const { username } = req.body; // The ID of the user being invited

        // Find the squad by its ID
        const squad = await Squad.findById(squad_id);
        if (!squad) {
            return res.status(404).json({ message: "Squad not found" });
        }

        // Find the user by their ID
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

        res.status(200).json({
            message: `User ${user.username} has been invited to the squad ${squad.squadName}.`,
            squad,
        });
    } catch (err) {
        res.status(500).json({ message: "Error inviting user", error: err.message });
    }
});


router.delete('/api/squads/:squad_id', async function (req, res, next) {
    try {
        const deletedSquad = await Squad.findOneAndDelete({ squad_id: req.params.squad_id });
        if (!deletedSquad) {
            return res.status(404).json({ message: "Squad not found" });
        }
        res.json({ message: "Squad deleted successfully", squad: deletedSquad });
    } catch (err) {
        res.status(500).json({ message: "Error deleting squad", error: err.message });
    }
});


router.delete('/api/squads', async function (req, res, next) {
    try {
        const deletedResult = await Squad.deleteMany({});
        res.status(200).json({
            message: "All squads deleted successfully",
            deletedCount: deletedResult.deletedCount,
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting squads", error: err.message });
    }
});

module.exports = router;