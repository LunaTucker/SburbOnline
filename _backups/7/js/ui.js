/////UI/////
var UI = new Phaser.Class({
        Extends: Phaser.Scene,
        
        initialize:
        function UI(){
            Phaser.Scene.call(this,{key:'UI', active: true});
        },
        
         preload: function()
    {
        this.load.image('textbox', 'assets/ui/textbox.png')  
        this.load.bitmapFont('courier', 'assets/fonts/courier.png', 'assets/fonts/courier.xml');        
        
        this.load.image('fullscreen', 'assets/ui/fullscreen.png');
        this.load.image('charSelectButton', 'assets/ui/character.png');
        
        this.load.image('rightArrow', 'assets/ui/rightArrow.png');
        this.load.image('leftArrow', 'assets/ui/leftArrow.png');
        this.load.image('upArrow', 'assets/ui/upArrow.png');
        this.load.image('downArrow', 'assets/ui/downArrow.png');
    },
    
    create: function(){
       uiScene = this;
       let currentText = this.add.bitmapText(-1000, -1000, 'courier', '', 24).setTint(0x008282);
       
       //FULLSCREEN
       //let fullscreenButton = this.add.sprite(575, 50, "fullscreen").setInteractive();
        
       //fullscreenButton.on('pointerdown', function(){
        //    currentScene.scale.toggleFullscreen();
  // });
  
      //ARROWS
      let rightArrow = this.add.sprite(160, 400, "rightArrow").setInteractive();
      let leftArrow = this.add.sprite(32, 400, "leftArrow").setInteractive();
      let upArrow = this.add.sprite(96, 336, "upArrow").setInteractive();
      let downArrow = this.add.sprite(96, 400, "downArrow").setInteractive();

      
     //Character Select
     characterSelectMenu();
     
       let characterSelectButton = this.add.sprite(575, 50, "charSelectButton").setInteractive();
        
       characterSelectButton.on('pointerdown', function(){
                characterSelectMenu();
            });
      

//FUNCTIONS//
      //On Arrow Press
       rightArrow .on('pointerdown', function(){
            self.right = "true";
                   this.setTint(0xff0000);
   });
       leftArrow.on('pointerdown', function(){
            self.left = "true";
                   this.setTint(0xff0000);
   });
       upArrow.on('pointerdown', function(){
            self.up= "true"; 
                   this.setTint(0xff0000);
   });
       downArrow.on('pointerdown', function(){
            self.down = "true";
                   this.setTint(0xff0000);
   });
   
    //On Arrow Release
       rightArrow .on('pointerup', function(){
            self.right = "false";
                this.clearTint();
   });
       leftArrow.on('pointerup', function(){
            self.left = "false";
                this.clearTint();
   });
       upArrow.on('pointerup', function(){
            self.up = "false";
                this.clearTint();
   });
       downArrow.on('pointerup', function(){
            self.down = "false";
                this.clearTint();
   });  

       //On Arrow Move Mouse
       rightArrow .on('pointerout', function(){
            self.right = "false";
                this.clearTint();
   });
       leftArrow.on('pointerout', function(){
            self.left = "false";
                this.clearTint();
   });
       upArrow.on('pointerout', function(){
            self.up = "false";
                this.clearTint();
   });
       downArrow.on('pointerout', function(){
            self.down = "false";
                this.clearTint();
   });  
    }
})


      function characterSelectMenu() {
                    //CHARACTER Select
          let characterSelect = uiScene.add.container(self.cameras.main.centerX, self.cameras.main.centerY);
          let characterSelectWindow = uiScene.add.sprite(0, 0, 'textbox');
          
          characterSelect.add(characterSelectWindow);
          
          playableCharacters.forEach(function (character, i){
              
          let playableCharacter = uiScene.add.sprite(-200 + (i * 100),0, character.name).setInteractive().play(character.down_idle);
                      
                    playableCharacter.on('pointerdown', function() {
                        self.player.changeCharacter(character);
                        console.log("click");
                        characterSelect.destroy();
                    });
            
          characterSelect.add(playableCharacter);
          
          });
      }
      