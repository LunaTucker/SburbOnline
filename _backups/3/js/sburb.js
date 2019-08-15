var config = {
  type: Phaser.AUTO,
  parent: 'gameCanvas',
  width: 650,
  height: 450,
  scale: {
        mode: Phaser.Scale.FIT, 
    },
  backgroundColor: '#000000',
  pixelArt: true,
  physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene:[Main, UI]
};

var game = new Phaser.Game(config);   


/////GLOBAL VARIABLES/////

    var self
    
 //controls
	var cursors;
    var spacebar; 
    var direction;
    var dir = {
        LEFT: 1,
        RIGHT: 2,
        DOWN: 3,
        UP: 4,
    };   



//HTML Buttons

function sendChatMessage (message) {
   var message = document.getElementById("message").value;
   
   if(message != null){
        if(self.player.message == null){
            self.player.message = self.add.text(self.player.x - 16, self.player.y - 64, message, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });;
               
    }    else{
            self.player.message.setText(message);
       }
       
     self.socket.emit('messageSend', {message}); 
   }      
}

function updateUsername (username) {
   var username = document.getElementById("username").value;
   
   if(username != null) {
       if(self.player.username == null){
           self.player.username = self.add.text(self.player.x - 16, self.player.y - 64, username, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });;
               
       } else{
           self.player.username.setText(username);
       }
       
       console.log(self.player.username);
   }
}      
        
//basic movement    



function movePlayer(player, playerPrefix) {
   //reset the velocity 
   player.setVelocity(0);
   
   
   //MOVEMENT//
   
   //pressing a key? lets move!
    if (cursors.left.isDown || self.left == "true")
    {
        //new velocity
        player.setVelocityX(-300);
        //new animation
        player.play(playerPrefix + '_left_walk', true);
        //new direction
        direction = dir.LEFT;
    }
    
    else if (cursors.right.isDown  || self.right == "true")
    {
        player.setVelocityX(300);
        player.play(playerPrefix + '_right_walk', true);
        direction = dir.RIGHT;

    }
    
    else if (cursors.up.isDown || self.up == "true")
    {
        player.setVelocityY(-300);
        player.play(playerPrefix + '_up_walk', true);
        direction = dir.UP;
    }
    
    else if (cursors.down.isDown || self.down == "true")
    {
        player.setVelocityY(300);
        player.play(playerPrefix + '_down_walk', true);
        direction = dir.DOWN;
    } 
    
    else
    {
        switch(direction) {
            //left
            case dir.LEFT:
                player.play(playerPrefix + '_left_idle',true);
                break;
            //right
            case dir.RIGHT:
                player.play(playerPrefix + '_right_idle',true);
                break;
            //up
            case dir.UP:
                player.play(playerPrefix + '_up_idle',true);
                break;
           //down
            case dir.DOWN:
                player.play(playerPrefix + '_down_idle',true);
                break;
        }
    }
    
}

//NETWORKING


//add local player
function addPlayer(self, playerInfo) {
   
  if (playerInfo.team === 'blue') {
      self.player = self.physics.add.sprite(400, 100, 'karkat').play('kk_down_idle');
      self.playerPrefix = "kk";
      
  } else {
      self.player = self.physics.add.sprite(400, 100, 'terezi').play('tz_down_idle');
      self.playerPrefix = "tz";
  }
  
}

//add other players
function addOtherPlayers(self, playerInfo) {
   var otherPlayer
  if (playerInfo.team === 'blue') {
    otherPlayer = self.physics.add.sprite(400, 100, 'karkat').play('kk_down_idle');
  } else {
    otherPlayer = self.physics.add.sprite(400, 100, 'terezi').play('tz_down_idle');
  }
        otherPlayer.playerId = playerInfo.playerId;
        self.otherPlayers.add(otherPlayer);
}