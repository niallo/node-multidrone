node-multidrone
===============

Node.JS program to configure AR Parrot drones to share a Wifi network

Based on instructions from http://drones.johnback.us/blog/2013/02/03/programming-multiple-parrot-a-dot-r-drones-on-one-network-with-node-dot-js/


## Scripts

Script to change IP and SSIDs on the Drone:


```bash

IP=200
SSID="my ssid"

WIFI_SETUP=/bin/wifi_setup.sh
DATA_CONFIG=/data/config.ini
    
# copy current wifi_setup.sh to backup
cp -p $WIFI_SETUP $WIFI_SETUP.old
sed -e "s/PROBE=.*/PROBE=$IP/g" $WIFI_SETUP.old > $WIFI_SETUP

# copy current config.ini to backup
cp $DATA_CONFIG $DATA_CONFIG.old
sed -e "s/\(^ssid_single_player.*=\).*/\1 $SSID/g" $DATA_CONFIG.old > $DATA_CONFIG

# apply the new network config
echo !!!! Reconfiguring drone.
echo !!!! You will be disconnected.
echo !!!! Reconnect to wifi network.

$WIFI_SETUP

```
