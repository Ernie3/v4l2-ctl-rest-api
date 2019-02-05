const express = require("express");
const router = express.Router();

const SETTINGS = [
    'brightness',
    'contrast',
    'exposure_absolute',
    'exposure_auto',
    'saturation',
    'sharpness'
];

router.get('/', function(req, res) {
    return res.json(SETTINGS);
});
