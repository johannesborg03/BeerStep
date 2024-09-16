const activity = require('./Activity');
var activityController = require('./controllers/activities');


app.get('/api/activities', async function (req, res)  {
    const activities = await activity.find();
    res.json({'activities': activities});
});

app.post('/api/activities', (req, res) => {
    var new_activities = {
        "activity_id": activity. activity_id,
        "beercount": req.body.beercount,
        "activity_type " : req.body.activity_type,
        "user" : req.body.user
    }

    activity.push(new_activity);
    res.status(201).json(new_activity);
});

app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});