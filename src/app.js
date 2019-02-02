const config = require('../config.json');
const express = require('express');
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');

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

const brightness = require('./routes/brightness');
app.use('/brightness', brightness);

const contrast = require('./routes/contrast');
app.use('/contrast', contrast);

const exposure_absolute = require('./routes/exposure_absolute');
app.use('/exposure_absolute', exposure_absolute);

const exposure_auto = require('./routes/exposure_auto');
app.use('/exposure_auto', exposure_auto);

const saturation = require('./routes/saturation');
app.use('/saturation', saturation);

const sharpness = require('./routes/sharpness');
app.use('/sharpness', sharpness);

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
});

const listener = app.listen(config.port, function() {
    console.log("Listening on +:" + listener.address().port);
});

module.exports = app;