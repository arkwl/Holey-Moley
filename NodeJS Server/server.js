//BitCamp 2018


var app = require("express")();
var server = require('http').createServer(app);
var debug = require('debug')('debug');
var WebSocket = require('ws');
var requests = require("request");

app.use(require('express').static('public'));
const wss = new WebSocket.Server({server});

//Public Data (bite me)
client_coords = [];

const getRandom = (min, max) => Math.random() * (max - min) + min;
function getPoint() {
  const x = getRandom(-73.975, -73.990);
  const y = getRandom(40.718, 40.732);
  const date = Date.now();
  const point = {
	tag: "add_point",
    geometry: {
      "x": x,
      "y": y
    },
    attributes: {
      "timeStamp": date
    }
  };
  return JSON.stringify(point);
}

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
setInterval(()=> {
	wss.broadcast(getPoint());
	debug("Updated Point");
}, 1000);

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
	  //ws.send(message)
	  message = JSON.parse(message);
	  console.log(typeof(message));
	  if (message.tag == "assign_point") {
			console.log('received: %s', message.tag);
		  	console.log(message.coords);
			console.log(message.coords.x);
			client_coords.push(message.coords)

			requests({
				url:"https://maps.googleapis.com/maps/api/geocode/json?latlng=" + message.coords.y + "," + message.coords.x + "&key=###########################",
				json: true
			}, function (error, res, body) {
				//console.log(JSON.parse(body).results[0].formatted_address);
				console.log(body);
			});

			var stuff = {
				tag: message.tag,
				address: body.results[0].formatted_address,
				coords: {
					x: message.coords.x,
					y: message.coords.y
				}
			}
		  wss.broadcast(JSON.stringify(stuff));
	  }

  });
});
/*
wss.on('message', function incoming(data) {
	debug("GOT DATA!");
	debug(data);
});
*/
/*
ws.on('client get coords', function incoming() {
  console.log(data);
});
*/

app.get('/city', (req,res) => {
	res.sendfile("index.html");	
});

app.get('/client', (req,res) => {
	res.sendfile("client.html");	
});


server.listen(1337, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server running on %s:%s", host, port);
});
