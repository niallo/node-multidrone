var fs = require('fs')
var net = require('net')
var path = require('path')

var scriptPath = path.join(__filename, "script.sh")

var commands = fs.readFileSync(scriptPath).split('\n')

// commands.unshift("IP=201\n")
// commands.unshift("SSID=myssid\n")

// require('multidrone')('192.168.1.1', 23)
module.exports = function(host, port) {




}
