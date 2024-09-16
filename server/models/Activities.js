const activity = require('./Activity');
var activityController = require('./controllers/activities');


app.post('/api/activities', (req, res) => {
    // Instantiate the Activity model with request data
    var new_activity = new Activity({
        "activity_id": req.body.activity_id, // If you want to set the ID manually (unusual), otherwise omit this
        "beercount": req.body.beercount,
        "activity_type": req.body.activity_type,
        "user": req.body.user
    });

    res.status(201).json(new_activity);
});


app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});