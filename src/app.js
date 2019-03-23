const config = require('../config.json');
const express = require('express');
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const generateSettingRoute = require('./lib/generateSettingRoute');

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Routes
const index = require('./routes/index');
app.use('/', index);

// TODO: make a route that dynamically determines the specific camera's 
// settings by parsing v4l2-ctl -d <device> -l instead of this
const settings = require('./routes/settings');
app.use('/settings', settings);

for(let setting of require('./controls.json')) {
    app.use('/' + setting.name, generateSettingRoute(setting.name, setting.min, setting.max));
}

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
});

const listener = app.listen(config.port, function() {
    console.log("Listening on +:" + listener.address().port);
});

module.exports = app;
