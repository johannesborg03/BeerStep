var express = require ('express');
var router = express.Router();

var User = require('../models/User.js');
var Activity = require('../models/Activity.js');

var methodOverride = require('method-override');

// Create a new user (POST /api/users)
router.post('/api/users', async function (req, res, next) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        squads: req.body.squads,
        total_beers: 0,
        total_steps: 0,
        steps_needed: 0
    });

    try {
        await user.save();

        //After Saving The user, Create a activity for this user:
        const newActivity = new Activity({
            user: user._id,  // Associate the activity with the user
            total_beers: 0,
            total_steps: 0,
            steps_needed: 0
        });
        // Save the new activity
        const savedActivity = await newActivity.save();

        // Push the activity into the user's activities array
        user.activities.push(savedActivity._id);

        // Save the updated user with the activity reference
        await user.save();


        // Respond with the user and activity
        res.status(200).json({
            message: "User and activity created successfully",
            user: user,
            activity: savedActivity
        });
    } catch (err) {
        console.error("Error while creating user:", err);  // Log the error for debugging
        if (err.code ===11000) {
            let duplicateField = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                message : `A user with the same ${duplicateField} already exist`,
                field : duplicateField
            });
        }
        res.status(500).json({
            message : "Server error while creating user",
            error : error.message
        });
    } 
});

// Get all Users
router.get('/api/users', async function (req, res, ){
    try{

        //Filtering by username, email
        const filter = {};
        if(req.query.username){
            filter.username = req.query.username;
        }
        if(req.query.email){
            filter.email = req.query.email;
        }

        //Sorting (by username or email)
        const sort = {};
        if (req.query.sortBy) {
            sort [req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
        }

        //Field selection (Specify which fields to include or exclude)
        const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '';

        // Fetch users from database with the specified options
        const users = await User.find(filter)
            .select(fields)    // Field selection
            .sort(sort)        // Sorting

    // const totalUsers = await User.find();
    res.status(200).json({
        message: "Users retrieved successfully",
        users: users
    });
} catch (error) {
    res.status(500).json({
        message: "Server error",
        error: error.message,
    });
}
});

//Get specific User
router.get('/api/users/:username', async function (req, res) {
    try{
    var username = req.params.username;
    const user = await User.findOne({username : username});
    if (!user){
        return res.status(404).json({"message": "No such user"});
    }
    res.json(user);
} catch (err) {
    res.status(500).json({"message" : "Server error", "error": err.message});
}
});

// Enable HTTP method overriding
router.use(methodOverride('_method'));

// Get specific User (GET with HTTP method overriding)
router.post('/api/users/:username', async function (req, res) {
    if (req.method === 'POST' && req.body._method === 'GET') {
        req.method = 'GET';  // Override the method to GET
    }
    if (req.method === 'GET') {
        try {
            var username = req.params.username;
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).json({ "message": "No such user" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ "message": "Server error", "error": err.message });
        }
    } else {
        res.status(405).json({ "message": "Method Not Allowed" });
    }
});

//Update a User
router.put('/api/users/:username', async function (req, res)  {
    try{
        var username = req.params.username;
        const updatedData = req.body;
        const updatedUser = await User.findOneAndUpdate({username : username}, updatedData, 
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
router.delete('/api/users/:username', async function (req, res) {
    try {
    var username = req.params.username;
    const deletedUser = await User.findOneAndDelete({username: username});
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
router.patch('/api/users/:username', async function (req, res) {
    try {
        const username = req.params.username;

        const updatedUser = await User.findOneAndUpdate(
            {username: username},
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
router.post('/api/users/:username/activities', async function (req, res) {
    try {
        const user = await User.findOne({ username : req.params.username });
        
        if (!user) {
            return res.status(404).json({ message : "User not found"});
        }

        //Create the new Activity
        const newActivity = new Activity ({
            beercount : req.body.beercount,
            activity_type : req.body.activity_type,
            user : user._id //This works?
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
router.get('/api/users/:username/activities', async function (req, res) {
    try{
        const user = await User.findOne({username : req.params.username});

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
router.get('/api/users/:username/activities/:activityId', async function (req, res){
    try {
        const user = await User.findOne({username : req.params.username});

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
router.delete('/api/users/:username/:activities/:activityId', async function (req, res){
    try {
        const user = await User.findOne({username : req.params.username});

        if(!user) {
            return res.status(404).json({ message : "User not found"});
        }
        const activity = await Activity.findOneAndDelete({ _id : req.params.activityId});

        if (!activity) {
            return res.status(404).json({ message : "Activity not found" });
        }

        //Remove the activity reference from the users activities array
        user.activities = user.activities.filter(actID => actID.toString()!== req.params.activityId);

        //Save the user after removing the activity
        await user.save();

        res.status(200).json({
            message : "Activity deleted successfully",
            activityId : req.params.activityId
        });
    } catch (errror) {
        res.status(500).json({
            message : "Server error while deleting activity",
            error : error.message
        });
    }
});



//OPTIONAL: Create a DELETE ROUTE for All activities for a Specific User
router.delete('/api/users/:username/activities', async function (req, res){
    try{
        const user = await User.findOne({ username : req.params.username});

        if(!user) {
            return res.status(404).json({ message : "User not found"});
        }

        //Delete all activities associated with this user
        await Activity.deleteMany({ _id : { $in: user.activities } });

        //Clear the users activities array
       user.activities = [];

    //Save the user after clearing the activities array
         await user.save();

    res.status(200).json({
        message : "All activities for the user have been deleted"
    });

    } catch (error) {
        res.status(500).json({
            message : "Server error while deleting activities",
            error : error.message
        });
        
    }
});


module.exports = router;
