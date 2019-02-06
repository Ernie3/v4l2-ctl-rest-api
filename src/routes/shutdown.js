const express = require("express");
const router = express.Router();

const execute = require('../lib/execute');

router.post('/', function(req, res) {
    console.warn('INITIATING SHUTDOWN');

    execute('sudo shutdown -h now');

    // no point in doing anything after that...
});

module.exports = router;
