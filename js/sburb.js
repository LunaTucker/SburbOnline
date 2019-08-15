var config = {
  type: Phaser.AUTO,
  scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'gameCanvas',
        width: 650,
        height: 450,
      
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


/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};


/////GLOBAL VARIABLES/////

    var self;
    var uiScene;
    
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
    

//chat functions

    //send message only to self
function clientMessage(message){
    $(".chat ul").append("<li>" + "SYSTEM: " + message + "</li>");
}
//HTML Buttons

function sendChatMessage (message) {
   var message = document.getElementById("message").value;

   if(message != null){

    //first sanitization 
    message = DOMPurify.sanitize(message, {SAFE_FOR_JQUERY: true, FORBID_TAGS: ['img']});

        //check the message length
       if(message.length < 100){
        if(self.player.message == null){
            //add a text object if we don't have one
            self.player.message = self.add.text(self.player.x - 16, self.player.y - 64, message, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });;              
    }    else{
            //else just update the text object
            self.player.message.setText(message);
       }
    //show the message in chatbox
    $(".chat ul").append("<li>" + self.player.username.text + ": " + message + "</li>");

    //scroll the chat down
    chatDiv.scrollTop = chatDiv.scrollHeight;

    //send the message to the server
     self.socket.emit('messageSend', {message}); 
        }else{
            clientMessage("Message too long!");
        }      
    }
}

function updateUsername (username) {
   var username = document.getElementById("username").value;
   if(username != null) {

    //first sanitization 
    username = DOMPurify.sanitize(username, {SAFE_FOR_JQUERY: true, FORBID_TAGS: ['img']});

       if (username.length < 20){
        self.player.username.setText(username);       
        self.socket.emit('usernameSend', {username});
       }else{
           clientMessage("Username too long!");
       }
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
        player.play(player.left_walk, true);
        //new direction
        direction = dir.LEFT;
    }
    
    else if (cursors.right.isDown  || self.right == "true")
    {
        player.setVelocityX(300);
        player.play(player.right_walk, true);
        direction = dir.RIGHT;

    }
    
    else if (cursors.up.isDown || self.up == "true")
    {
        player.setVelocityY(-300);
        player.play(player.up_walk, true);
        direction = dir.UP;
    }
    
    else if (cursors.down.isDown || self.down == "true")
    {
        player.setVelocityY(300);
        player.play(player.down_walk, true);
        direction = dir.DOWN;
    } 
    
    else
    {
        switch(direction) {
            //left
            case dir.LEFT:
                player.play(player.left_idle,true);
                break;
            //right
            case dir.RIGHT:
                player.play(player.right_idle,true);
                break;
            //up
            case dir.UP:
                player.play(player.up_idle,true);
                break;
           //down
            case dir.DOWN:
                player.play(player.down_idle,true);
                break;
        }
    }
    
}



//add local player
function addPlayer(self, playerInfo, collisionLayer) {
    
    //first we get a random point to spawnpoints
    //we choose a random zone of all the spawnpoint zones on the map
  var randomSpawnzone = spawnpoints[Math.floor(Math.random()* spawnpoints.length)];
                            //console.log(randomSpawnzone);
   
   //then we choose a random tile within that zone
  var randomSpawnSpot = randomSpawnzone[Math.floor(Math.random()* randomSpawnzone.length)]
                            //console.log(randomSpawnSpot);
    
    //then we get the co-ords of that tile. we adjust the X to move the player from the side of the tile to the middle of it
  var randomX = randomSpawnSpot.pixelX + (randomSpawnSpot.width / 2);
  var randomY = randomSpawnSpot.pixelY;
  
                           //console.log(`grabbed point [${randomX}, ${randomY}]`);
   
   
  if (playerInfo.team === 'blue') {
      //self.player = self.physics.add.sprite(randomX, randomY, 'karkat').play('kk_down_idle');
      //self.playerPrefix = "kk";
      
      self.player = new sburbCharacter(self, randomX, randomY, karkat);
      self.playerPrefix = "kk";
      
  } else {
      self.player = new sburbCharacter(self, randomX, randomY, karkat);
      self.playerPrefix = "kk";
  }

  //set the collision
            self.player.setCollideWorldBounds(true);
            self.physics.add.collider(self.player, self.collisionLayer);
            
  //adjust the size of the hitbox
            self.player.setSize(self.player.width * 0.5, self.player.height * 0.25, true);
            self.player.body.setOffset(self.player.width * 0.25, self.player.height * 0.70);
      
  //set camera to follow
            self.cameras.main.startFollow(self.player, true, 0.05, 0.05);  
  //default username
            self.player.username = self.add.text(self.player.x - 16, self.player.y - 64, "anon", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
            
}

//NETWORKING//

//add other players
function addOtherPlayers(self, playerInfo) {
    var otherPlayer
    otherPlayer = new sburbCharacter(self, playerInfo.x, playerInfo.y, karkat);
                            //console.log(`adding player at ${playerInfo.x},${playerInfo.y}`);
    otherPlayer.playerId = playerInfo.playerId;
    otherPlayer.username = self.add.text(playerInfo.x - 16, playerInfo.y - 80, "<" + "anon" + ">", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });;
    self.otherPlayers.add(otherPlayer);
}

