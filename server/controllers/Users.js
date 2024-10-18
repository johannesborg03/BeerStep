var express = require ('express');
var router = express.Router();

var User = require('../models/User.js');
var Squad = require('../models/Squad.js');
var Leaderboard = require('../models/Leaderboard.js')

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
        steps_needed: 0,
        milestones: req.body.milestones,
    });

    try {
        await user.save();
        // Respond with the user and activity
        res.status(201).json({
            message: "User created successfully",
            user: user
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

// GET squads a specific user is a member of

router.get('/api/users/:username/squads', async function (req, res) {
    try {
      // Log the request for debugging
      console.log(`Fetching squads for user: ${req.params.username}`);
  
      // Find the user by their username and populate their squads
      const user = await User.findOne({ username: req.params.username })
  .populate({
    path: 'squads',
    select: 'squadName created_by leaderboard',  // Include 'leaderboard' in the select for squads
    populate: {
      path: 'created_by',  // Populate the 'created_by' field in the squads
      model: 'User',       // Reference the correct model (User)
      select: 'username'   // Select only the username field from 'created_by'
    }
  });

  
      // Log the retrieved user object
      console.log('User found:', user);
  
      // If no user is found, return 404
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the squads the user is part of
      res.status(200).json({
        message: "Squads retrieved successfully",
        squads: user.squads
      });
    } catch (error) {
      // Log the error for debugging
      console.error('Error retrieving squads:', error);
      
      // Return a 500 error with detailed error message
      res.status(500).json({
        message: "Server error while retrieving squads",
        error: error.message
      });
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

router.delete('/api/users/:username/squads', async function (req, res) {
    try {
        const username = req.params.username;
        
        // Find the user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Find the squads where the user is the creator and a member
        const squadsToDelete = await Squad.find({
            _id: { $in: user.squads },              
            created_by: user._id                    
        });

        if (squadsToDelete.length === 0) {
            return res.status(404).json({
                message: "No squads found to delete"
            });
        }

        // Loop through each squad to handle members and leaderboards
        for (const squad of squadsToDelete) {
            await User.updateMany(
                { squads: squad._id },                
                { $pull: { squads: squad._id } }       
            );

            
            if (squad.leaderboard) {
                await Leaderboard.findByIdAndDelete(squad.leaderboard);
            }
        }

        
        await Squad.deleteMany({
            _id: { $in: squadsToDelete.map(squad => squad._id) }
        });

        res.status(200).json({
            message: "Squads and associated leaderboards deleted successfully",
            deletedSquads: squadsToDelete.map(squad => squad.squadName)
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error while deleting squads the user created",
            error: error.message,
        });
    }
});
module.exports = router;
