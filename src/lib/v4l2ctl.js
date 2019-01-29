const execute = require("./execute");
const controlValueParser = require('./controlValueParser');

function getControl(device, control) {
    return new Promise((resolve, reject) => {
        execute('v4l2-ctl -d ' + device + ' --get-ctrl ' + control)
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

function setControl(device, control, value) {
    return new Promise((resolve, reject) => {
        return execute('v4l2-ctl -d ' + device + ' --set-ctrl=' + control + '=' + value)
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
