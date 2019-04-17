# v4l2-ctl-rest-api
RESTful API to control USB camera settings via v4l2-ctl.

## Installing
1. `git clone https://github.com/Ernie3/v4l2-ctl-rest-api.git`
2. `cd v4l2-ctl-rest-api`
3. `npm install`
4. `npm start`

## How to Use this API
All endpoints follow the structure `GET /{device}/{setting}` or `POST /{device}/{setting}/{value}`. You can also get the maximum and minimum values of a setting via `GET /{setting}/max_value` or `GET /{setting}/min_value`.

## Currently Supported Setting Controls
You can get the currently supported settings using `GET /settings`. This will return all of the supported settings as an array of strings.

## Example
If you have a USB device connected to `/dev/video0`, you can get its current brightness via `GET /0/brightness`, or set its brightness via `POST /0/brightness/130`. Or for example if you want to address a camera that is plugged into the top right USB port by its static path (by its USB port), flip the value for `by_path` in `config.json` then you can `POST /1.3/brightness/130`

## How to use by-path (by USB port)
Template
```
Top Left USB | Top Right USB
----------------------------
Bot Left USB | Bot Right USB
```

For Raspberry Pi Model B+
```
1.1.2 | 1.3
-----------
1.1.3 | 1.2
```

## Setting up v4l2-ctl-rest-api to Run on Boot
```
./service_manager.sh argument

install - installs v4l2-ctl-rest-api service and enables start on boot
start - starts v4l2-ctl-rest-api via systemctl (service must be installed)
stop - stops v4l2-ctl-rest-api via systemctl (service must be installed)
enable - enables v4l2-ctl-rest-api to start on boot (service must be installed)
disable - disables v4l2-ctl-rest-api from starting on boot (service must be installed)
uninstall - completely removes v4l2-ctl-rest-api service from systemctl
```

## See Also
1. [Installing Node.js on a Raspberry Pi](https://github.com/Ernie3/pi_h264#help-installing-nodejs-v10-on-the-pi)
2. [pi_h264](https://github.com/Ernie3/pi_h264)
