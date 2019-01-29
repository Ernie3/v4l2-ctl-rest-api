const express = require("express");
const router = express.Router();

const v4l2ctl = require('../lib/v4l2ctl');
const normalizeValue = require('../lib/normalizeValue');

const devicePrefix = '/dev/video';
const SETTING = 'exposure_auto';
const MIN_VALUE = 0;
const MAX_VALUE = 3;

router.post("/:deviceId/:value", function(req, res) {
    let deviceId = req.params.deviceId;
    let value = parseInt(req.params.value);

    let device = devicePrefix + deviceId;
    v4l2ctl.setControl(device, SETTING, normalizeValue(value, MIN_VALUE, MAX_VALUE))
        .then(() => {
            v4l2ctl.getControl(device, SETTING)
                .then(control => res.json(control))
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
});

router.get("/:deviceId", function(req, res) {
    let deviceId = req.params.deviceId;
    
    v4l2ctl.getControl(devicePrefix + deviceId, SETTING)
        .then(control => res.json(control))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
