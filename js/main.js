
///// SCENE START /////
var Main = new Phaser.Class({
        Extends: Phaser.Scene,
        
        initialize:
        
function Main(){
Phaser.Scene.call(this,{key:'Main', active: true});
   
},
    
preload: function() { 
    this.load.animation('karkatData', 'assets/characters/karkat_anim.json');
    this.load.atlas('karkat', 'assets/characters/karkat.png', 'assets/characters/karkat_atlas.json');
    
    this.load.animation('tereziData', 'assets/characters/terezi_anim.json');
    this.load.atlas('terezi', 'assets/characters/terezi.png', 'assets/characters/terezi_atlas.json');

    this.load.animation('aradiaData', 'assets/characters/aradia_anim.json');
    this.load.atlas('aradia', 'assets/characters/aradia.png', 'assets/characters/aradia_atlas.json');
    
    this.load.animation('vriskaData', 'assets/characters/vriska_anim.json');
    this.load.atlas('vriska', 'assets/characters/vriska.png', 'assets/characters/vriska_atlas.json');
    
    this.load.image("tiles", "assets/maps/tiles.png");
    this.load.tilemapTiledJSON("collisionTest", "assets/maps/collisionTest.json");
    
    
},


create: function() {
    
    
    //save the current scene 
    self = this;
    
    
    
    
    
    //MAP
    
            //load map and tileset
    const map = self.make.tilemap({key:"collisionTest"});
    const tileset = map.addTilesetImage("tiles", "tiles");
    
        //load layers
            //ground layers
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
            //collision layers
    self.collisionLayer = map.createStaticLayer("Collision", tileset, 0, 0);
            //object layers
    var objectsLayer = map.getObjectLayer("Objects");
    
            //get objects, send to a function in maps.js
    Object.keys(objectsLayer.objects).forEach(function (key) {
        var currentObject = objectsLayer.objects[key]
        addMapObject(currentObject, map, worldLayer);
    });
    
    //tell the game we want every tile to have variable collision
    map.setCollisionByExclusion([-1]);
    
        //set world bounds
    self.physics.world.bounds.width = map.widthInPixels;
    self.physics.world.bounds.height = map.heightInPixels;
    
    
    
    
   //networking players
    self.otherPlayers = this.physics.add.group();
    this.socket = io();
    
    //recieves the current players in the server
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === self.socket.id) {
            addPlayer(self, players[id], self.collisionLayer);
          } else {
            addOtherPlayers(self, players[id]);
          }
        });
      });

  //recieved when the server tells us a new player joined
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });

  //recieved when the server tells us another player disconnected
  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      //remove the disconnected player
      if (playerId === otherPlayer.playerId) {
        if(otherPlayer.username != null){
            otherPlayer.username.destroy();
        }
        if(otherPlayer.message != null){
            otherPlayer.message.destroy();
        }

        otherPlayer.destroy();
      }
    });
  });

  //recieved when server tells us another player moved
  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
            //recieve the other player's position
            otherPlayer.setRotation(playerInfo.rotation);
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            //recieve the other player's current animation and frame
            otherPlayer.play(playerInfo.animation.key, true, playerInfo.frame.frame); 
                       //move username
               if(otherPlayer.username != null) {
                    otherPlayer.username.setPosition(playerInfo.x - 16, playerInfo.y - 64);
               }
                      //move message
               if(otherPlayer.message != null) {
                    otherPlayer.message.setPosition(playerInfo.x - 16, playerInfo.y - 85);
               }
      }
    });
  });

  //recieved when the server tells us a message was retrieved
  this.socket.on('messageRecieve', function (playerInfo) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
              var message = playerInfo.message;
              //console.log("message is" + message);
                if(otherPlayer.message == null){
                   otherPlayer.message = self.add.text(playerInfo.x - 16, playerInfo.y - 85, message, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });;
                       
                } else{
                   otherPlayer.message.setText(message);
                };
                
                //update the chatbox

                if (playerInfo.username == undefined){
                  $(".chat ul").append("<li>" + "anon" + ": " + message + "</li>");
                    //scroll the chat down
                    chatDiv.scrollTop = chatDiv.scrollHeight;

                }else {
                  $(".chat ul").append("<li>" + playerInfo.username + ": " + message + "</li>");
                    //scroll the chat down
                    chatDiv.scrollTop = chatDiv.scrollHeight;

                }
               

        }
  });
});
 
//recieved when the server tells us a username was retrieved
this.socket.on('usernameRecieve', function(playerInfo){
  self.otherPlayers.getChildren().forEach(function (otherPlayer){
    if (playerInfo.playerId === otherPlayer.playerId) {
          //recieve the other player's username
            otherPlayer.username.setText("<" + playerInfo.username + ">"); 
      };
    });
  });


  this.socket.on('characterChangeRecieve', function(playerInfo, character) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                       
                       //console.log(`changing other player to ${character.name}`);
                       otherPlayer.changeCharacter(character);
                    }
                });
});
  
    //CONTROLS
    
   //create the keys for movement
   cursors = this.input.keyboard.createCursorKeys();
    //remove space and shift, we need those for sending messages!
   this.input.keyboard.removeCapture(32, 16);
   
   //removed until I figure out how to still let the player type messages
   //keys = this.input.keyboard.addKeys('W,A,S,D');

    
},

update: function() {  
    if(self.player !== undefined){
       //local movement
       movePlayer(self.player, self.playerPrefix);

        //move username
       if(self.player.username != null) {
            self.player.username.setPosition(self.player.x - 16, self.player.y - 64);
       }
       //move message
       if(self.player.message != null) {
            self.player.message.setPosition(self.player.x - 16, self.player.y - 85);
       }
       //network movement
        var x = self.player.x;
        var y = self.player.y;
        var r = self.player.rotation;
        var animation = self.player.anims.currentAnim;
        var frame = self.player.anims.currentFrame;
         //send the username if they have one
        if(self.player.username != null) {
            var username = self.player.username.text;
        }else{
            var username = "anon";
        }
        
        if (self.player.oldPosition && (x !== self.player.oldPosition.x || y !== self.player.oldPosition.y || r !== self.player.oldPosition.rotation || animation != self.player.oldPosition.animation)) {
          self.socket.emit('playerMovement', { x: self.player.x, y: self.player.y, rotation: self.player.rotation, animation: animation, frame: frame, username: username});
        }
         
        // save old position data
        self.player.oldPosition = {
          x: self.player.x,
          y: self.player.y,
          rotation: self.player.rotation,
          animation: self.player.anims.currentAnim
        };

    }      
},   
})