const express = require("express");

const v4l2ctl = require('../lib/v4l2ctl');
const normalizeValue = require('../lib/normalizeValue');

const config = require('../../config.json');
const isByPath = config.by_path;

function generateSettingRoute(name, min, max) {
    let router = express.Router();

    router.get(`/${name}/min_value`, function(req, res) {
        res.json({ min: min });
    });
    
    router.get(`/${name}/max_value`, function(req, res) {
        res.json({ max: max });
    });
    
    router.post(`/:device/${name}/:value`, function(req, res) {
        let device = req.params.device;
        let value = parseInt(req.params.value);
        let setFunction;

        // Validation
        if(isNaN(value) || value < min || value > max) {
            return res.status(500).send(`Value must be between ${min} and ${max}`);
        }
    
        if(isByPath) {
            setFunction = v4l2ctl.setControlByPath(device, name, normalizeValue(value, min, max));
        } else {
            setFunction = v4l2ctl.setControl(device, name, normalizeValue(value, min, max));
        }

        setFunction
            .then(control => res.json(control))
            .catch(error => res.status(500).json(error));
    });
    
    router.get(`/:device/${name}`, function(req, res) {
        let device = req.params.device;
        let getFunction;
    
        if(isByPath) {
            getFunction = v4l2ctl.getControlByPath(device, name);
        } else {
            getFunction = v4l2ctl.getControl(device, name);
        }

        getFunction
            .then(control => res.json(control))
            .catch(error => res.status(500).json(error));
    });

    return router;
}

module.exports = generateSettingRoute;
