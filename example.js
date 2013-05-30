var arDrone = require('ar-drone');

var client1  = arDrone.createClient({ip:"192.168.1.1"});
var client2  = arDrone.createClient({ip:"192.168.1.2"});

client1.takeoff();

client1
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });

client2.takeoff();

client2
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });
