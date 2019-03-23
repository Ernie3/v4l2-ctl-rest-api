const fs = require('fs');
const execute = require("./execute");
const getCtrlParser = require('./getCtrlParser');

/**
 * Gets the specified control for the device using by-path.
 * @param {string} device the static device path for the camera
 * @param {string} control the control name
 */
function getControlByPath(device, control) {
    return new Promise((resolve, reject) => {
        execute(`v4l2-ctl -d ${fs.realpathSync(device.replace(/_/g, '/'))} --get-ctrl ${control}`)
            .then(output => {
                if(output.stderr) {
                    return reject(data.stderr);
                }

                return resolve(getCtrlParser(output.stdout));
            })
            .catch(error => reject(error));
    });
}

/**
 * Gets the specified control for the device.
 * For example, to get the brightness for /dev/video0, you
 * would call: getControl(0, 'brightness').
 * @param {number} deviceId the device number of the camera
 * @param {string} control the control name
 */
function getControl(deviceId, control) {
    return new Promise((resolve, reject) => {
        execute(`v4l2-ctl -d /dev/video${deviceId} --get-ctrl ${control}`)
            .then(output => {
                if(output.stderr) {
                    return reject(data.stderr);
                }

                return resolve(getCtrlParser(output.stdout));
            })
            .catch(error => reject(error));
    });
}

/**
 * Sets the specified control value for the device.
 * For example, to set the brightness for /dev/video0 
 * to 140, you would call: setControl(0, 'brightness', 140).
 * @param {string} device the device path of the camera
 * @param {string} control the control name
 * @param {number} value the desired value
 * @return the new setting for the device
 */
function setControlByPath(device, control, value) {
    return new Promise((resolve, reject) => {
        return execute(`v4l2-ctl -d ${fs.realpathSync(device.replace(/_/g, '/'))} --set-ctrl=${control}=${value}`)
            .then(output => {
                if(output.stderr) {
                    return reject(data.stderr);
                }

                return resolve({
                    setting: control,
                    value: value
                });
            })
            .catch(error => reject(error));
    });
}

/**
 * Sets the specified control value for the device using by-path.
 * @param {number} deviceId the device number of the camera
 * @param {string} control the control name
 * @param {number} value the desired value
 * @return the new setting for the device
 */
function setControl(deviceId, control, value) {
    return new Promise((resolve, reject) => {
        return execute(`v4l2-ctl -d /dev/video${deviceId} --set-ctrl=${control}=${value}`)
            .then(output => {
                if(output.stderr) {
                    return reject(data.stderr);
                }

                return resolve({
                    setting: control,
                    value: value
                });
            })
            .catch(error => reject(error));
    });
}

module.exports.getControlByPath = getControlByPath;
module.exports.getControl = getControl;
module.exports.setControlByPath = setControlByPath;
module.exports.setControl = setControl;