var express = require ('express');
var router = express.Router();

var User = require('../models/users.js');


// Create a new user (POST /api/users)
router.post('/api/users', async function (req, res, next) {
    var user = newUser({

        //Fill in with attributes
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
router.put('api/users/:id', async function (req, res) {
    var id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({"message": "No such user"});
    }
    res.json(user);
});

// 





module.exports = router;
