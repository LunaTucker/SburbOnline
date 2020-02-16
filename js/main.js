
///// SCENE START /////
var Main = new Phaser.Class({
        Extends: Phaser.Scene,
        
        initialize:
        
function Main(){
Phaser.Scene.call(this,{key:'Main', active: true});
   
},
    
preload: function() { 

      //save the current scene 
      self = this;

      
//LOADING SCREEN
    //create the screen
      //box
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);
      //text
  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
          font: '20px monospace',
          fill: '#ffffff'
      }
  });
loadingText.setOrigin(0.5, 0.5);


    //update the progress as we go
  this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
  });
            
this.load.on('fileprogress', function (file) {
    //console.log(file.src);
});

 //remove loading screen
this.load.on('complete', function () {	
  loadingText.destroy();
  progressBar.destroy();
  progressBox.destroy();
});



    //loads all the characters! nicely wrapped into their custom class in 'characters.js'
    loadCharacters();

    //load the hitscan texture
    //note to self: change this for a phaser rectangle object
    this.load.image("hitscan", "assets/objects/interactbox.png");
    //load the map, we'll wrap this up nicely in the future too!
    this.load.image("tiles3", "assets/maps/tiles3.png");
    this.load.tilemapTiledJSON("map2", "assets/maps/map2.json");
    
    
},


create: function() {
  
    //MAP
    
            //load map and tileset
    const map = self.make.tilemap({key:"map2"});
    const tileset = map.addTilesetImage("tiles3", "tiles3");
    
        //load layers
        //players have depth of 3
            //ground layers
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
          worldLayer.depth = 0;
          //static object layers
    const StaticObjectsBelowLayer = map.createStaticLayer("StaticObjectsBelow", tileset, 0, 0);
          StaticObjectsBelowLayer.depth = 1;
    const StaticObjectsAboveLayer = map.createStaticLayer("StaticObjectsAbove", tileset, 0, 0);
          StaticObjectsAboveLayer.depth = 4;
            //collision layers
    self.collisionLayer = map.createStaticLayer("Collision", tileset, 0, 0);
    
    self.objectscollisionLayer = map.createStaticLayer("StaticObjectsCollision", tileset, 0, 0);
            //dynamic object layers
    var objectsLayer = map.getObjectLayer("Objects");

     
            //get objects, send to a function in maps.js
    Object.keys(objectsLayer.objects).forEach(function (key) {

        var currentObject = objectsLayer.objects[key];

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
            otherPlayer.play(playerInfo.animation.key, true); 
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
            //message is sent from the server, chatmessage is used for the chatbar, gamemessage displays over your character
              var message = playerInfo.message;
              var chatmessage = message.replace(/(.{1,30})/g, '$1<br>');
              var gamemessage = message.replace(/(.{1,30})/g, '$1\n');


        //// This is the system for the chatbox above your head. It sucks. TODO: Replace with an animated icon when a message is sent. ////
    /*
                if(otherPlayer.message == null){
                   otherPlayer.message = self.add.text(playerInfo.x - 16, playerInfo.y - 85, gamemessage, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });;
                       
                } else{
                   otherPlayer.message.setText(gamemessage);
                   otherPlayer.message.depth = 10;
                };
                */

                //update the chatbox

                if (playerInfo.username == undefined){
                  $(".chat ul").append("<li>" + "anon" + ": " + chatmessage + "</li>");
                    //scroll the chat down
                    //chatDiv.scrollTop = chatDiv.scrollHeight;
                    $('.chat ul').animate({scrollTop: $('.chat ul').prop("scrollHeight")}, 500);
                    checkOverflow();

                }else {
                  $(".chat ul").append("<li>" + playerInfo.username + ": " + chatmessage + "</li>");
                    //scroll the chat down
                    //chatDiv.scrollTop = chatDiv.scrollHeight;
                    $('.chat ul').animate({scrollTop: $('.chat ul').prop("scrollHeight")}, 500);
                    checkOverflow();

                }
               

        }
  });
});
 
//recieved when the server tells us a username was retrieved
this.socket.on('usernameRecieve', function(playerInfo){
  self.otherPlayers.getChildren().forEach(function (otherPlayer){
    if (playerInfo.playerId === otherPlayer.playerId) {
          //recieve the other player's username

          //make sure they didnt fool the clientside limit
          if (playerInfo.username.length < 18){
            otherPlayer.username.setText(playerInfo.username); 
            console.log(playerInfo);
            otherPlayer.username.setFill(playerInfo.character.character.color).setBackgroundColor("#dedede"); 
            otherPlayer.username.depth = 10;
          };
      };
    });
  });


  this.socket.on('characterChangeRecieve', function(playerInfo, character) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                       
                       //console.log(`changing other player to ${character.name}`);
                       otherPlayer.player = character;

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