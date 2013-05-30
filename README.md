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

# copy current wifi_setup.sh to backup
cp $WIFI_SETUP $WIFI_SETUP.old
sed -e "s/PROBE=.*/PROBE=$IP/g" $WIFI_SETUP.old > $WIFI_SETUP


```
