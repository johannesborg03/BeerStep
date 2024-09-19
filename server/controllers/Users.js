var express = require ('express');
var router = express.Router();

var User = require('../models/User.js');
var Activity = require('../models/Activity.js');

// Create a new user (POST /api/users)
router.post('/api/users', async function (req, res, next) {
    var user = new User({
        userID: req.body.userID,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        squads: req.body.squads,
        activities: req.body.activities,
    });

    try {
        await user.save();
    } catch (err) {
        next(err);
    }  
    res.status(201).json(user);
});

// Get all Users
router.get('/api/users', async function (req, res, ){
    const users = await User.find();
    res.json({'users': users});
});

//Get specific User
router.get('/api/users/:userID', async function (req, res) {
    try{
    var userID = req.params.userID;
    const user = await User.findOne({userID : userID});
    if (!user){
        return res.status(404).json({"message": "No such user"});
    }
    res.json(user);
} catch (err) {
    res.status(500).json({"message" : "Server error", "error": err.message});
}
});

//Update a User
router.put('/api/users/:userID', async function (req, res)  {
    try{
        var userID = req.params.userID;
        const updatedData = req.body;
        const updatedUser = await User.findOneAndUpdate({userID : userID}, updatedData, 
            {new: true, runValidators: true}
        );
        if (!updatedUser){
            return res.status(404).json({"message": "No such user"});
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({"message" : "Server error", "error": err.message});
    }
    });

// Delete a specific user
router.delete('/api/users/:userID', async function (req, res) {
    try {
    var userID = req.params.userID;
    const deletedUser = await User.findOneAndDelete({userID: userID});
    if(!deletedUser) {
        return res.status(404).json({"message": "No such user"});
}
    res.json({ "message": "User deleted successfully", "user" : deletedUser});
} catch (err) {
    res.status(500).json({"message" : "Server error", "error" : err.message});
}
});

//Delete all users
router.delete('/api/users', async function (req, res) {
    try {
        const deletedResult = await User.deleteMany({});
        res.status(200).json({
            message: "All users succesfully deleted",
            deletedCount: deletedResult.deletedCount,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error while deleting users",
            error: err.message,
        });
    }
});

// Partially update a User
router.patch('/api/users/:userID', async function (req, res) {
    try {
        const userID = req.params.userID;

        const updatedUser = await User.findOneAndUpdate(
            {userID: userID},
            { $set: req.body },
            {new: true, runValidators: true} //Return the updated documents and run schema validators
        );
        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(updatedUser);
    } catch (err){
        res.status(500).json({
            message: "Server error while updating the user",
            error: err.message,
        });
    }
});

// Create a POST route for logging Activity for a specific User
router.post('/api/users/:userID/activities', async function (req, res) {
    try {
        const user = await User.findOne({ userID : req.params.userID });
        
        if (!user) {
            return res.status(404).json({ message : "User not found"});
        }

        //Create the new Activity
        const newActivity = new Activity ({
            activity_id : req.body.activity_id,
            beercount : req.body.beercount,
            activity_type : req.body.activity_type,
            user : user._id //Can you do this?
        });

        //Save Activity
        const savedActivity = await newActivity.save();

        //Push the activity into the Users Activities array
        user.activities.push(savedActivity._id)  //Again, can you do this with the id??
        await user.save();

        res.status(201).json({
            message : "Activity logged Successfully",
            activity : savedActivity
        });

    } catch (error) {
        res.status(500).json({
            message : "Server error while logging activity",
            error : error.message
        });
    }

});



// Create a GET route for Activities for a specific User
router.get('/api/users/:userID/activities', async function (req, res) {
    try{
        const user = await User.findOne({userID : req.params.userID});

        if (!user){
            return res.status(404).json({ message : "User not found"});
        }

        //Return the activities of the user:
        res.status(200).json({
            message : "Activities retrieved successfully",
            activities : user.activities
        });
    } catch (error) {
        res.status(500).json({
            message : "Server error while retrieving activities",
            error : error.message
        });
    }
});

// Create a GET route for a specifc Activity for a Specific User
router.get('/api/users/:userID/activities/:activityId', async function (req, res){
    try {
        const user = await User.findOne({userID : req.params.userID});

        if (!user){
            return res.status(404).json({ message : "User not found"});
        }

        //Find specific activity by MongoDB_id within users activities
        const activity = user.activities.find(act => act._id.toString() == req.params.activityId);

        if (!activity){
            return res.status(404).json({  message : "Activity not found"});
        }

        //Return specific Activity
        res.status(200).json({
            message : "Activity retrieved successfully",
            activity : activity
        });
    } catch (error) {
        res.status(500).json({
            message : "Server error while retrieving activity",
            error : error.message
        });
    }
});




// Create a DELETE route for a specific Activity for a Specific User

//OPTIONAL: Create a DELETE ROUTE for All activities for a Specific User





module.exports = router;
