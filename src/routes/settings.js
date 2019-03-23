const express = require("express");
const router = express.Router();

// TODO: make a route that dynamically determines the specific camera's 
// settings by parsing v4l2-ctl -d <device> -l instead of this
let settingNames = [];
for(let setting of require('../controls.json')) {
    settingNames.push(setting.name);
}

router.get('/', function(req, res) {
    return res.json(settingNames);
});

module.exports = router;
