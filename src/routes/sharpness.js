const express = require("express");
const router = express.Router();

const v4l2ctl = require('../lib/v4l2ctl');
const normalizeValue = require('../lib/normalizeValue');

const SETTING = 'sharpness';
const MIN_VALUE = 0;
const MAX_VALUE = 50;

router.get("/min_value", function(req, res) {
    res.json({ min: MIN_VALUE });
});

router.get("/max_value", function(req, res) {
    res.json({ max: MAX_VALUE });
});

router.post("/:devicePath/:value", function(req, res) {
    let devicePath = req.params.devicePath;
    let value = parseInt(req.params.value);

    v4l2ctl.setControl(devicePath, SETTING, normalizeValue(value, MIN_VALUE, MAX_VALUE))
        .then(control => res.json(control))
        .catch(error => res.status(500).json(error));
});

router.get("/:devicePath", function(req, res) {
    let devicePath = req.params.devicePath;

    v4l2ctl.getControl(devicePath, SETTING)
        .then(control => res.json(control))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
