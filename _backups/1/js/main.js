
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
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === self.socket.id) {
            addPlayer(self, players[id]);
          } else {
            addOtherPlayers(self, players[id]);
          }
        });
      });
  
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  
  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });

  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });
  
   playerPrefix = "kk";
   cursors = this.input.keyboard.createCursorKeys();
},

update: function() {  
    if(self.player !== undefined){
       //local movement
       movePlayer(self.player, self.playerPrefix);

    
        
       //network movement
        var x = self.player.x;
        var y = self.player.y;
        var r = self.player.rotation;
        if (self.player.oldPosition && (x !== self.player.oldPosition.x || y !== self.player.oldPosition.y || r !== self.player.oldPosition.rotation)) {
          self.socket.emit('playerMovement', { x: self.player.x, y: self.player.y, rotation: self.player.rotation});
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