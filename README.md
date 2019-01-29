# v4l2-ctl-rest-api
RESTful API to control USB camera settings via v4l2-ctl

## Installing
1. git clone
2. npm install
3. npm start

## How to Use this API
All endpoints follow the structure `GET /{setting}/{deviceId}` or `POST /{setting}/{deviceId}/{value}`.

## Currently Supported Setting Controls
1. brightness
2. contrast
3. saturation
4. sharpness
5. exposure_absolute
6. exposure_auto
