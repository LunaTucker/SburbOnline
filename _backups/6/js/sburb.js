var config = {
  type: Phaser.AUTO,
  parent: 'gameCanvas',
  width: 650,
  height: 450,
  scale: {
        mode: Phaser.Scale.FIT, 
       parent: 'gameCanvas',
        width: 650,
        height: 450,
         min: {
            width: 325,
            height: 225
        },
        max: {
            width: 1300,
            height: 900
        }
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


//Map
    var spawnpoints = [];
    

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
function addPlayer(self, playerInfo, collisionLayer) {
    
    //first we get a random point to spawnpoints
    //we choose a random zone of all the spawnpoint zones on the map
  var randomSpawnzone = spawnpoints[Math.floor(Math.random()* spawnpoints.length)];
   // console.log(randomSpawnzone);
   
   //then we choose a random tile within that zone
  var randomSpawnSpot = randomSpawnzone[Math.floor(Math.random()* randomSpawnzone.length)]
    console.log(randomSpawnSpot);
    
    //then we get the co-ords of that tile. we adjust the X to move the player from the side of the tile to the middle of it
  var randomX = randomSpawnSpot.pixelX + (randomSpawnSpot.width / 2);
  var randomY = randomSpawnSpot.pixelY;
  
  //console.log(`grabbed point [${randomX}, ${randomY}]`);
   
   
   //right now its a 50/50 chance of karkat or terezi
  if (playerInfo.team === 'blue') {
      //self.player = self.physics.add.sprite(randomX, randomY, 'karkat').play('kk_down_idle');
     // self.playerPrefix = "kk";
      self.player = self.physics.add.sprite(randomX, randomY, 'aradia').play('aradia_down_idle');
      self.playerPrefix = "aradia";
      
  } else {
      self.player = self.physics.add.sprite(randomX, randomY, 'terezi').play('tz_down_idle');
      self.playerPrefix = "tz";
  }
  
    //and set up some player stuff
           //smaller collision box, centered around their feet. hopefully scales correctly for different sized characters
           //TO DO: tie this to the characters once they are unique objects?
      self.player.setSize(self.player.width * 0.5, self.player.height * 0.25, true);
      self.player.body.setOffset(self.player.width * 0.25, self.player.height * 0.70);
           //set camera to follow
      self.cameras.main.startFollow(self.player, true, 0.05, 0.05);
           //collide at world edges
      self.player.setCollideWorldBounds(true);
          //collide with collision layer of tilemap
      self.physics.add.collider(self.player, collisionLayer);
}

//add other players
function addOtherPlayers(self, playerInfo) {
   var otherPlayer
   
   console.log(`adding player at ${playerInfo.x},${playerInfo.y}`);
  if (playerInfo.team === 'blue') {
    otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'karkat').play('kk_down_idle');
  } else {
    otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'terezi').play('tz_down_idle');
  }
    
        otherPlayer.playerId = playerInfo.playerId;
        self.otherPlayers.add(otherPlayer);
}

