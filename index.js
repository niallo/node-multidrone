var fs   = require('fs');
var net  = require('net');
var path = require('path');

// require('multidrone')('192.168.1.1', 23)
module.exports = function(desiredIP, ssid, currentIP) {

    if (!desiredIP) desiredIP = '192.168.1.201';
    if (!ssid) ssid = 'shared_drone_ssid';
    if (!currentIP) currentIP = '192.168.1.1';

    var port   = 23;
    var telnet = net.connect(port, currentIP);
    telnet.on('error', console.error);
    // telnet.on('data', function (data) { console.log('DATA="%s"', data.toString()); });
    telnet.on('end', function() { console.log('client disconnected'); });

    var __dirname = __dirname || process.cwd();
    var scriptPath = path.join(__dirname, "change_ssid_and_ip.txt");
    var commands   = fs.readFileSync(scriptPath, 'utf8').split('\n').filter(function (line) { return (line !== '') && line[0] !== '#'; })
    var lastOctet  = desiredIP.split('.').pop();

    commands.unshift("export IP='" + lastOctet + "'");
    commands.unshift("export SSID='" + ssid + "'");
    console.log('COMMANDS', commands);
    for (var i=0, l=commands.length, command; i < l; i++) {
        command = commands[i];
        console.log('COMMAND:', command);
        telnet.write(command + '\n');
    }
    telnet.end();

};
