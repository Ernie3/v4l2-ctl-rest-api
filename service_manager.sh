#!/bin/bash

if [ "$1" = "install" ]
then
    echo "Adding v4l2ctl-api service to systemctl..."
    sudo cp v4l2ctl-api.service /etc/systemd/system/v4l2ctl-api.service
    sudo systemctl enable v4l2ctl-api.service
    echo "Done."
elif [ "$1" = "start" ]
then
    echo "Starting v4l2ctl-api service..."
    sudo systemctl start v4l2ctl-api.service
elif [ "$1" = "stop" ]
then
    echo "Stopping v4l2ctl-api service..."
    sudo systemctl stop v4l2ctl-api.service
elif [ "$1" = "enable" ]
then
    echo "Enabling v4l2ctl-api service to start on boot..."
    sudo systemctl enable v4l2ctl-api.service
elif [ "$1" = "disable" ]
then
    echo "Disabling v4l2ctl-api service from starting on boot..."
    sudo systemctl disable v4l2ctl-api.service
elif [ "$1" = "uninstall" ]
then
    echo "Removing v4l2ctl-api service from systemctl..."
    sudo systemctl stop v4l2ctl-api.service
    sudo systemctl disable v4l2ctl-api.service
    sudo rm -f /etc/systemd/system/v4l2ctl-api.service
    sudo systemctl daemon-reload
elif [ "$1" = "help" ]
then
    echo ""
    echo "./service_manager.sh argument"
    echo ""
    echo "install - installs v4l2ctl-api service and enables start on boot"
    echo "start - starts v4l2ctl-api via systemctl (service must be installed)"
    echo "stop - stops v4l2ctl-api via systemctl (service must be installed)"
    echo "enable - enables v4l2ctl-api to start on boot (service must be installed)"
    echo "disable - disables v4l2ctl-api from starting on boot (service must be installed)"
    echo "uninstall - completely removes v4l2ctl-api service from systemctl"
    echo ""
else
    echo "Invalid option. Options are help, install, uninstall, enable, disable, start, stop."
fi
