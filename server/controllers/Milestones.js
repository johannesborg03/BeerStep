var express = require('express');
var router = express.Router();
var Milestone = require('../models/milestone.model');

// Create a new milestone for a specific user (POST /api/users/:id/milestones)
router.post('/api/users/:userId/milestones', async function (req, res) {
    try {
        // Find the user by userId
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new milestone
        var milestone = new Milestone({
            userId: user._id, // Reference to the user
            milestone_name: req.body.milestone_name,
            steps_required: req.body.steps_required,
            date_achieved: req.body.date_achieved || null // Default to null if not provided
        });

        await milestone.save();
        res.status(201).json({
            message: "Milestone created successfully",
            milestone: milestone
        });
    } catch (err) {
        console.error("Error while creating milestone:", err);  // Log the error for debugging
        res.status(500).json({
            message: "Server error while creating milestone",
            error: err.message
        });
    }
});

// Get all milestones for a specific user (GET /api/users/:id/milestones)
router.get('/api/users/:userId/milestones', async function (req, res) {
    try {
        // Find the milestones for the user
        const milestones = await Milestone.find({ userId: req.params.userId });
        if (!milestones.length) {
            return res.status(404).json({ message: "No milestones found for this user" });
        }
        res.status(200).json({
            message: "Milestones retrieved successfully",
            milestones: milestones
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while retrieving milestones",
            error: error.message,
        });
    }
});

// Get a specific milestone by ID (GET /api/milestones/:id)
router.get('/api/milestones/:id', async function (req, res) {
    try {
        var milestone = await Milestone.findById(req.params.id);
        if (!milestone) {
            return res.status(404).json({"message": "No such milestone"});
        }
        res.status(200).json(milestone);
    } catch (err) {
        res.status(500).json({"message": "Server error", "error": err.message});
    }
});

// Update a milestone by ID (PUT /api/milestones/:id)
router.put('/api/milestones/:id', async function (req, res) {
    try {
        const updatedMilestone = await Milestone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMilestone) {
            return res.status(404).json({"message": "No such milestone"});
        }
        res.status(200).json(updatedMilestone);
    } catch (err) {
        res.status(500).json({"message": "Server error", "error": err.message});
    }
});

// Delete a specific milestone (DELETE /api/milestones/:id)
router.delete('/api/milestones/:id', async function (req, res) {
    try {
        const deletedMilestone = await Milestone.findByIdAndDelete(req.params.id);
        if (!deletedMilestone) {
            return res.status(404).json({"message": "No such milestone"});
        }
        res.status(200).json({ "message": "Milestone deleted successfully", "milestone": deletedMilestone });
    } catch (err) {
        res.status(500).json({"message": "Server error", "error": err.message});
    }
});

// Delete all milestones (DELETE /api/milestones)
router.delete('/api/milestones', async function (req, res) {
    try {
        const deletedResult = await Milestone.deleteMany({});
        res.status(200).json({
            message: "All milestones successfully deleted",
            deletedCount: deletedResult.deletedCount,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error while deleting milestones",
            error: err.message,
        });
    }
});

module.exports = router;
