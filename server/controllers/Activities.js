var express = require('express');
var router = express.Router();

var Activity = require('../models/Activity.js');


    router.post('/api/activities', async function (req, res, next) {
        try {
            // Validate required fields
            if (!req.body.beercount || !req.body.activity_type || !req.body.user) {
                return res.status(400).json({
                    message: 'Beercount, activity type, and user fields are required.'
                });
            }
    
            // Instantiate the Activity model with request data
            var new_activity = new Activity({
                beercount: req.body.beercount,
                activity_type: req.body.activity_type,
                user: req.body.user
            });
    
            // Attempt to save the activity to the database
            await new_activity.save();
    
            // Send the response if the activity is saved successfully
            res.status(201).json(new_activity);
    
        } catch (err) {
            // Handle duplicate key error (E11000)
            if (err.code === 11000) {
                let duplicateField = Object.keys(err.keyValue)[0]; // Find which field caused the duplicate error
                return res.status(409).json({
                    message: `An activity with the same ${duplicateField} already exists.`,
                    field: duplicateField
                });
            }
    
            // Handle validation or other errors
            res.status(500).json({
                message: 'Server error while creating activity',
                error: err.message
            });
        }
    });
    

// Get all activities
router.get('/api/activities', async function (req, res,) {
    const activities = await Activity.find();
    res.json({'activities': activities});
});

//Get specific activity
router.get('/api/activities/:activity_id', async function (req, res) {
    try {
        var activity_id = req.params.activity_id;
        const activity = await Activity.findById(activity_id);
        if (!activity) {
            return res.status(404).json({ "message": "No such activity" });
        }
        res.json(activity);
    } catch (err) {
        res.status(500).json({ "message": "Server error", "error": err.message });
    }
});

//Update a activity
router.put('/api/activities/:activity_id', async function (req, res) {
    try {
        var activity_id = req.params.activity_id;
        const updatedData = req.body;
        const updatedActivity = await Activity.findByIdAndUpdate(activity_id, updatedData,
            { new: true, runValidators: true }
        );
        if (!updatedActivity) {
            return res.status(404).json({ "message": "No such activity" });
        }
        res.json(updatedActivity);
    } catch (err) {
        res.status(500).json({ "message": "Server error", "error": err.message });
    }
});

// Delete a specific activity 
router.delete('/api/activities/:activity_id', async function (req, res) {
    try {
        var activity_id = req.params.activity_id;
        const deletedActivity = await Activity.findByIdAndDelete(activity_id);
        if (!deletedActivity) {
            return res.status(404).json({ "message": "No such activity" });
        }
        res.json({ "message": "Activity deleted successfully", "activity": deletedActivity });
    } catch (err) {
        res.status(500).json({ "message": "Server error", "error": err.message });
    }
});

//Delete all activities
router.delete('/api/activities', async function (req, res) {
    try {
        const deletedResult = await Activity.deleteMany({});
        res.status(200).json({
            message: "All activities successfully deleted",
            deletedCount: deletedResult.deletedCount,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error while deleting activities",
            error: err.message,
        });
    }
});

// Partially update a activity
router.patch('/api/activities/:activity_id', async function (req, res) {
    try {
        const activity_id = req.params.activity_id;

        const updatedActivity = await Activity.findByIdAndUpdate(
            (activity_id),
            { $set: req.body },
            {new: true, runValidators: true} //Return the updated documents and run schema validators
        );
        if (!updatedActivity) {
            return res.status(404).json({message: "Activity not found"});
        }
        res.status(200).json(updatedActivity);
    } catch (err){
        res.status(500).json({
            message: "Server error while updating the activity",
            error: err.message,
        });
    }
});


module.exports = router;
