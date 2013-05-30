var fs   = require('fs');
var net  = require('net');
var path = require('path');

// require('multidrone')('192.168.1.201', 'shared_drone_ssid', '192.168.1.1')
module.exports = function(desiredIP, ssid, currentIP) {

    if (!desiredIP) desiredIP = '192.168.1.201';
    if (!ssid) ssid = 'shared_drone_ssid';
    if (!currentIP) currentIP = '192.168.1.1';

    var telnetPort   = 23;
    var telnetSocket = net.connect(telnetPort, currentIP);

    telnetSocket.on('error', console.error);
    // telnetSocket.on('data', function (data) { console.log('DATA="%s"', data.toString()); });
    telnetSocket.on('end', function() { console.log('client disconnected'); });

    var __dirname = __dirname || process.cwd();
    var scriptPath = path.join(__dirname, "change_ssid_and_ip.txt");
    var commands   = fs.readFileSync(scriptPath, 'utf8').split('\n');
    var lastOctet  = desiredIP.split('.').pop();

    commands = commands.filter(function (line) {
        return (line !== '') && line[0] !== '#';
    });
    commands.unshift("export IP='" + lastOctet + "'");
    commands.unshift("export SSID='" + ssid + "'");

    for (var i=0, l=commands.length, command; i < l; i++) {
        command = commands[i];
        telnetSocket.write(command + '\n');
    }
    telnetSocket.end();
};
