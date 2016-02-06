var express = require('express'); // Get the module
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var config = require('../config.json'); // config file

server.listen(config.server_port);

console.info('Server started on', getLocalIPAddress(), '- Port', config.server_port);

module.exports = function(_cb){
  
  // set middleware
  app.use(bodyParser.json());

  // API and Web Server + Socket part
  _cb({http: app, io: io});

};

function getLocalIPAddress() {
  // synchronous method
  var interfaces = require('os').networkInterfaces();
  var IPs = [];
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        IPs.push(alias.address);
    }
  }

  if (IPs.length === 1) return IPs[0];
  else if(IPs.length > 1) return IPs.toString();
  else return '0.0.0.0';
}