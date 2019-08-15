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
   var message = document.getElementById("chatMessage").value;
      console.log(message);
}

function updateUsername (username) {
   var username = document.getElementById("username").value;
   
   self.player.username = username;
   console.log(self.player.username);
}    

function onMouseEnter(){
            game.input.enabled = true;
        }

function onMouseLeave(){
            game.input.enabled = false;
        }  
        
//basic movement    



function movePlayer(player, playerPrefix) {
   //reset the velocity 
   player.setVelocity(0);
   
   
   //MOVEMENT//
   
   //pressing a key? lets move!
    if (cursors.left.isDown || keys.A.isDown)
    {
        //new velocity
        player.setVelocityX(-300);
        //new animation
        player.play(playerPrefix + '_left_walk', true);
        //new direction
        direction = dir.LEFT;
    }
    
    else if (cursors.right.isDown || keys.D.isDown)
    {
        player.setVelocityX(300);
        player.play(playerPrefix + '_right_walk', true);
        direction = dir.RIGHT;

    }
    
    else if (cursors.up.isDown || keys.W.isDown)
    {
        player.setVelocityY(-300);
        player.play(playerPrefix + '_up_walk', true);
        direction = dir.UP;
    }
    
    else if (cursors.down.isDown || keys.S.isDown)
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