const fs = require('fs');
const execute = require("./execute");
const getCtrlParser = require('./getCtrlParser');

// Callback for getting a camera control
function getControlCallback(output, resolve, reject) {
    if(output.stderr) {
        return reject(data.stderr);
    }

    return resolve(getCtrlParser(output.stdout));
}

// Callback for setting a camera control
function setControlCallback(output, control, value, resolve, reject) {
    if(output.stderr) {
        return reject(data.stderr);
    }

    return resolve({
        setting: control,
        value: value
    });
}

/**
 * Gets the specified control for the device using by-path.
 * @param {string} portId the USB port ID
 * @param {string} control the control name
 */
function getControlByPath(portId, control) {
    return new Promise((resolve, reject) => {
        execute(`v4l2-ctl -d /dev/v4l/by-path/platform-3f980000.usb-usb-0:${portId}:1.0-video-index0 --get-ctrl ${control}`)
            .then(output => getControlCallback(output, resolve, reject))
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
            .then(output => getControlCallback(output, resolve, reject))
            .catch(error => reject(error));
    });
}

/**
 * Sets the specified control value for the device using by-path.
 * @param {string} portId the USB port ID
 * @param {string} control the control name
 * @param {number} value the desired value
 * @return the new setting for the device
 */
function setControlByPath(portId, control, value) {
    return new Promise((resolve, reject) => {
        execute(`v4l2-ctl -d /dev/v4l/by-path/platform-3f980000.usb-usb-0:${portId}:1.0-video-index0 --set-ctrl=${control}=${value}`)
            .then(output => setControlCallback(output, control, value, resolve, reject))
            .catch(error => reject(error));
    });
}

/**
 * Sets the specified control value for the device.
 * For example, to set the brightness for /dev/video0 
 * to 140, you would call: setControl(0, 'brightness', 140).
 * @param {number} deviceId the device number of the camera
 * @param {string} control the control name
 * @param {number} value the desired value
 * @return the new setting for the device
 */
function setControl(deviceId, control, value) {
    return new Promise((resolve, reject) => {
        execute(`v4l2-ctl -d /dev/video${deviceId} --set-ctrl=${control}=${value}`)
            .then(output => setControlCallback(output, control, value, resolve, reject))
            .catch(error => reject(error));
    });
}

module.exports.getControlByPath = getControlByPath;
module.exports.getControl = getControl;
module.exports.setControlByPath = setControlByPath;
module.exports.setControl = setControl;
