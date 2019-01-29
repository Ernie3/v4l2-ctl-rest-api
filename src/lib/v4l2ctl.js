const execute = require("./execute");
const controlValueParser = require('./controlValueParser');

function getControl(deviceId, control) {
    return new Promise((resolve, reject) => {
        execute('v4l2-ctl -d /dev/video' + deviceId + ' --get-ctrl ' + control)
            .then(output => {
                if(output.stderr) {
                    return reject(data.stderr);
                }

                var controlValue = controlValueParser(output.stdout);
            
                return resolve({
                    setting: controlValue[0],
                    value: controlValue[1]
                });
            })
            .catch(error => reject(error));
    });
}

function setControl(deviceId, control, value) {
    return new Promise((resolve, reject) => {
        return execute('v4l2-ctl -d /dev/video' + deviceId + ' --set-ctrl=' + control + '=' + value)
            .then(output => {
                if(output.stderr) {
                    return reject(data.stderr);
                }

                return resolve(null);
            })
            .catch(error => reject(error));
    });
}

module.exports.getControl = getControl;
module.exports.setControl = setControl;
