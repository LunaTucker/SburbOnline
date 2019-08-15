var http = require('http');
var express = require('express');
var app = express();
//var server = http.createServer();
var server = http.Server(app);
var io = require('socket.io').listen(server);

	
var players = {};

var star = {
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50
};
var scores = {
  blue: 0,
  red: 0
};


app.use( '/programming/sburb2', express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  
      // create a new player and add it to our players object
    players[socket.id] = {
      rotation: 0,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: socket.id,
      animation: "none",
      frame: "none",
      username: "none",
      team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    
    socket.on('disconnect', function () {
        console.log('user disconnected');

        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
        
      });
  
      // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].rotation = movementData.rotation;
      players[socket.id].animation = movementData.animation;
      players[socket.id].frame = movementData.frame;
      players[socket.id].username = movementData.username;
      // emit a message to all players about the player that moved
      socket.broadcast.emit('playerMoved', players[socket.id]);
    });

        // when a player sends a new message
    socket.on('messageSend', function (message) {
        console.log("message sent");
      players[socket.id].message = message
      // emit a message to all players about the player that moved
      socket.broadcast.emit('messageRecieve', players[socket.id]);
    });


});
 
server.listen(3000, function () {
  console.log(`Listening on ${server.address().port}`);
});

