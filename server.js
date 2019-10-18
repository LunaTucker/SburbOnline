var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var io = require('socket.io').listen(server);

var string = require("string-sanitizer");
var sanitizeHtml = require('sanitize-html');



var players = {};



app.use( '/games/sburb', express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  
      // create a new player and add it to our players object
    players[socket.id] = {
      rotation: 0,
      x: -1000,
      y: -1000,
      playerId: socket.id,
      animation: "none",
      frame: "none",
      username: "none"
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
      //console.log(movementData);
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
      //console.log(message);
      // Allow only a super restricted set of tags and attributes
      var cleanMessage = sanitizeHtml(message.message, {
              allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
              allowedAttributes: {
                'a': [ 'href' ]
              },
              allowedIframeHostnames: ['www.youtube.com']
            });

      cleanMessage = cleanMessage.replace(/(.{1,30})/g, '$1<br/>')

      players[socket.id].message = cleanMessage;
      console.log(cleanMessage);
      // emit a message to all players about the player that moved
      socket.broadcast.emit('messageRecieve', players[socket.id]);
    });

    socket.on('usernameSend', function (username) {
    console.log(username);
          // Allow only a super restricted set of tags and attributes
      var cleanUsername = sanitizeHtml(username.username, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
            allowedAttributes: {
              'a': [ 'href' ]
            },
            allowedIframeHostnames: ['www.youtube.com']
          });

    players[socket.id].username = cleanUsername;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('usernameRecieve', players[socket.id]);
  });

    socket.on('characterChange', function(character){
        socket.broadcast.emit('characterChangeRecieve', players[socket.id], character);
     });
     
});

server.listen(3000, function () {
  console.log(`Listening on ${server.address().port}`);
});
