# v4l2-ctl-rest-api
RESTful API to control USB camera settings via v4l2-ctl

## Installing
1. `git clone https://github.com/Ernie3/v4l2-ctl-rest-api.git`
2. `cd v4l2-ctl-rest-api`
3. `npm install`
4. `npm start`

## How to Use this API
All endpoints follow the structure `GET /{setting}/{deviceId}` or `POST /{setting}/{deviceId}/{value}`. You can also get the maximum and minimum values of a setting via `GET /{setting}/max_value` or `GET /{setting}/min_value`.

## Currently Supported Setting Controls
1. brightness
2. contrast
3. saturation
4. sharpness
5. exposure_absolute
6. exposure_auto
