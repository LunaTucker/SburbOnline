
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
},


create: function() {
    //save the current scene 
    self = this;
    self.otherPlayers = this.physics.add.group();
    
   //networking players
    this.socket = io();
    
    //recieves the current players in the server
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === self.socket.id) {
            addPlayer(self, players[id]);
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
        console.log(playerInfo.frame);
        //recieve the other player's current animation and frame
        otherPlayer.play(playerInfo.animation.key, true, playerInfo.frame.frame); 
      }
    });
  });
   
   //create the keys for movement
   cursors = this.input.keyboard.createCursorKeys();
   keys = this.input.keyboard.addKeys('W,A,S,D');
   
},

update: function() {  
    if(self.player !== undefined){
       //local movement
       movePlayer(self.player, self.playerPrefix);

    
       //network movement
        var x = self.player.x;
        var y = self.player.y;
        var r = self.player.rotation;
        var animation = self.player.anims.currentAnim;
        var frame = self.player.anims.currentFrame;

        
        if (self.player.oldPosition && (x !== self.player.oldPosition.x || y !== self.player.oldPosition.y || r !== self.player.oldPosition.rotation)) {
          self.socket.emit('playerMovement', { x: self.player.x, y: self.player.y, rotation: self.player.rotation, animation: animation, frame: frame});
        }
         
        // save old position data
        self.player.oldPosition = {
          x: self.player.x,
          y: self.player.y,
          rotation: self.player.rotation
        };

    }        
},   

})