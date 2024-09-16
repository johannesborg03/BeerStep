var express = require ('express');
var router = express.Router();

var User = require('../models/User.js');


// Create a new user (POST /api/users)
router.post('/api/users', async function (req, res, next) {
    var user = newUser({
        userID: req.body.userId,
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

router.get('/api/users', async function (req, res, ){
    const users = await User.find();
    res.json({'users': users});
});

//Get specific User
router.get('/api/users/:id', async function (req, res) {
    var id = req.params.id;
    const user = await User.findById(id);
    if (!user){
        return res.status(404).json({"message": "No such user"});
    }
    res.json(user);
});

//Update a User
router.put('api/users/:id', async function (req, res)  {
    try{
    var id = req.params.id;
    const user = await User.findByIdAndUpdate(id);
    if (!user) 
        return res.status(404).json({"message": "No such user"});
    res.json(user);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
});


// Delete a user
router.delete('api/users/:id', async function (req, res) {
    try {
    var id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user) 
        return res.status(404).json({"message": "No such user"});
    res.json(user);
} catch (error) {
    res.status(500).json({message : error.message});
}
});


module.exports = router;
