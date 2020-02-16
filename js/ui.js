var menuBool = false;


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
        this.load.image('characters1', 'assets/ui/characters1.png')  
        this.load.image('characters2', 'assets/ui/characters2.png')
        this.load.image('characters3', 'assets/ui/characters3.png')    
        this.load.image('characters4', 'assets/ui/characters4.png')    
        this.load.bitmapFont('courier', 'assets/fonts/courier.png', 'assets/fonts/courier.xml');        
    
        this.load.image('charSelectButton', 'assets/ui/character.png');
        this.load.image('settingsButton', 'assets/ui/settings.png');

        this.load.image('close', 'assets/ui/close.png');
        
        this.load.image('rightArrow', 'assets/ui/rightArrow.png');
        this.load.image('leftArrow', 'assets/ui/leftArrow.png');
        this.load.image('upArrow', 'assets/ui/upArrow.png');
        this.load.image('downArrow', 'assets/ui/downArrow.png');
    },
    
    create: function(){
       uiScene = this;

       let currentText = this.add.bitmapText(-1000, -1000, 'courier', '', 24).setTint(0x008282);
      
       //ARROWS
      let rightArrow = this.add.sprite(160, 400, "rightArrow").setInteractive();
      let leftArrow = this.add.sprite(32, 400, "leftArrow").setInteractive();
      let upArrow = this.add.sprite(96, 336, "upArrow").setInteractive();
      let downArrow = this.add.sprite(96, 400, "downArrow").setInteractive();

      
     //Character Select
     //characterSelectMenu();
     
       let characterSelectButton = this.add.sprite(575, 50, "charSelectButton").setInteractive();
       let uisettingsButton = this.add.sprite(50, 50, "settingsButton").setInteractive();
        
       characterSelectButton.on('pointerdown', function(){
                //check if we have a menu open already
                if (menuBool == false){
                    menuBool = true;
                    characterSelectMenu();
                }
            });
        
        uisettingsButton.on('pointerdown', function(){
            //check if we have a menu open already
            if (menuBool == false){
                menuBool = true;
                settingsMenu();
            }
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
        //add a phaser container
          let characterSelect = uiScene.add.container(self.cameras.main.centerX, self.cameras.main.centerY);
          //add a sprite for the window

            //first window
          let csWindow1 = uiScene.add.sprite(0,0, 'characters1').setInteractive({pixelPerfect: true});
            //focus on menu when clicked
            csWindow1 .on('pointerdown', function(){
                characterSelect.bringToTop(csWindow1);
                characterSelect.bringToTop(closeButton);
                displayCharacters(charTrollBeta, characterSelect);

        });
        

          let csWindow2 = uiScene.add.sprite(0,0, 'characters2').setInteractive({pixelPerfect: true});
            csWindow2 .on('pointerdown', function(){
                characterSelect.bringToTop(csWindow2);
                characterSelect.bringToTop(closeButton);
                displayCharacters(charHuman, characterSelect);
        });

        let csWindow3 = uiScene.add.sprite(0,0, 'characters3').setInteractive({pixelPerfect: true});
        csWindow3 .on('pointerdown', function(){
            characterSelect.bringToTop(csWindow3);
            characterSelect.bringToTop(closeButton);
            displayCharacters(charMisc, characterSelect);
    });

    let csWindow4 = uiScene.add.sprite(0,0, 'characters4').setInteractive({pixelPerfect: true});
    csWindow4 .on('pointerdown', function(){
        characterSelect.bringToTop(csWindow4);
        characterSelect.bringToTop(closeButton);
        displayCharacters(charTrollAlpha, characterSelect);
});

            //CLOSE
            let closeButton = uiScene.add.sprite(0, 175, 'close').setInteractive({pixelPerfect: true});
            //focus on menu when clicked
            closeButton.on('pointerdown', function(){
                menuBool = false;
                characterSelect.destroy();
        });

        
        //add the windows to the container
          characterSelect.add(csWindow1);
          characterSelect.add(csWindow2);
          characterSelect.add(csWindow3);
          characterSelect.add(csWindow4);
          characterSelect.add(closeButton);
        //display the first window on top
          characterSelect.bringToTop(csWindow1);
          characterSelect.bringToTop(closeButton);
          displayCharacters(charTrollBeta, characterSelect);
      }
//called when a page of characters is loaded
      //takes in a set of characters [array] and the menu to destroy when a character is chosen
function displayCharacters(set, characterSelect){
        //add a group for the character buttons
        csCharacters = uiScene.add.group();

        //loop through every character we have loaded
        set.forEach(function (character, i){
            //add a clickable sprite of the character that changes you to them
            let playableCharacter = uiScene.add.sprite(0, 0, character.name).setInteractive().play(character.down_idle).setScale(.8)
                        playableCharacter.on('pointerdown', function() {
                            menuBool = false;
                            self.player.changeCharacter(character);
                            self.socket.emit('characterChange', {character});
                            characterSelect.destroy();
                            csCharacters.destroy();
                        });

            //add the clickable sprite to the container
            csCharacters.add(playableCharacter);
            characterSelect.add(playableCharacter);
          });

          //align all the characters in a neat grid. 6x2 = 12 is a good number for homestuck
          Phaser.Actions.GridAlign(csCharacters.getChildren(), {
            width: 6,
            height: 2,
            cellWidth: 90,
            cellHeight: 90,
            position: Phaser.Display.Align.BOTTOM_CENTER,
            x: characterSelect.x * - 0.70,
            y: characterSelect.y * - 0.35
        });

}

function settingsMenu(){
        //add a phaser container
        let settingsContainer = uiScene.add.container(self.cameras.main.centerX, self.cameras.main.centerY);
        //add a sprite for the window

        //SETTINGS
        let setWindow1 = uiScene.add.sprite(0,0, 'characters1').setInteractive({pixelPerfect: true});
        //focus on menu when clicked
        setWindow1.on('pointerdown', function(){
            settingsContainer.bringToTop(setWindow1);
            settingsContainer.bringToTop(closeButton);
            showSettings(settingsContainer);
    });

        //CREDITS
        let setWindow2 = uiScene.add.sprite(0,0, 'characters2').setInteractive({pixelPerfect: true});
        //focus on menu when clicked
        setWindow2.on('pointerdown', function(){
            settingsContainer.bringToTop(setWindow2);
            settingsContainer.bringToTop(closeButton);
            showCredits(settingsContainer);

    });

        //Patreon
            let setWindow3 = uiScene.add.sprite(0,0, 'characters3').setInteractive({pixelPerfect: true});
            //focus on menu when clicked
            setWindow3.on('pointerdown', function(){
                settingsContainer.bringToTop(setWindow3);
                settingsContainer.bringToTop(closeButton);
                showPatreon(settingsContainer);
    
        });

        //CLOSE
        let closeButton = uiScene.add.sprite(0, 175, 'close').setInteractive({pixelPerfect: true});
        //focus on menu when clicked
        closeButton.on('pointerdown', function(){
            menuBool = false;
            settingsContainer.destroy();
    });

        //add the windows to the container
        settingsContainer.add(setWindow1);
        settingsContainer.add(setWindow2);
        settingsContainer.add(setWindow3);
        settingsContainer.add(closeButton);
        //display the first window on top
        settingsContainer.bringToTop(setWindow1);
        //load the settings to start
        showSettings(settingsContainer);
        //draw the close button above all else
        settingsContainer.bringToTop(closeButton);
}



function showSettings(window){
    //title
    var title = self.add.text(-300, -150, 'Settings', { fontFamily: `Courier, Courier New`, fontSize: 56, color: '#696969'});
    window.add(title);
    window.bringToTop(title);
    //desc
    var desc = self.add.text(-275, -75, 'Settings coming soon!', { fontFamily: `Courier, Courier New`, fontSize: 24, color: '#696969'});
    window.add(desc);
    window.bringToTop(desc);   
    //noclip
    //camera controls
    //


}

function showCredits(window){
      //title
      var title = self.add.text(-300, -150, 'Credits', { fontFamily: `Courier, Courier New`, fontSize: 56, color: '#696969'});
      window.add(title);
      window.bringToTop(title);
      //credits
      var credit1 = self.add.text(-300, -75, 'This game uses an immense amount of assets from Homestuck, \n see the official site for full Credits: \n https://www.homestuck.com/credits/art', { fontFamily: `Courier, Courier New`, fontSize: 16, color: '#696969'});
      window.add(credit1);
      window.bringToTop(credit1);  

      var credit2 = self.add.text(-300, 0, 'Apollyon Woman - John', { fontFamily: `Courier, Courier New`, fontSize: 16, color: '#696969'});
      window.add(credit2);
      window.bringToTop(credit2);   

      var credit3 = self.add.text(-300, 75, 'Homestuck Discord Mod Team - Various Asset Ripping and Spriting', { fontFamily: `Courier, Courier New`, fontSize: 16, color: '#696969'});
      window.add(credit3);
      window.bringToTop(credit3);   
}

function showPatreon(window){
        //title
      var title = self.add.text(-300, -150, 'Patreon', { fontFamily: `Courier, Courier New`, fontSize: 56, color: '#696969'});
      window.add(title);
      window.bringToTop(title);
      //donors
      var credit1 = self.add.text(-300, -85, '  My Patreon is for my personal art, Homestuck content \n is not paywalled. \n\n  However, your support keeps me and the servers alive! \n\n   You can also check it out for a feed of my other \n non-Homestuck endeavors c: \n      Thank you for your support! \n      patreon.com/lunatucker', { fontFamily: `Courier, Courier New`, fontSize: 16, color: '#696969'});
      window.add(credit1);
      window.bringToTop(credit1); 
      var credit2 = self.add.text(-300, 25, '\n\n ----- \n cyberKinetist \n Elizabeth Gotski \n takenUsername', { fontFamily: `Courier, Courier New`, fontSize: 16, color: '#696969'});
      window.add(credit2);
      window.bringToTop(credit2); 
      var credit3 = self.add.text(-300, 120, '  This page is not automated yet, so let me know if \n you have donated and not been added!', { fontFamily: `Courier, Courier New`, fontSize: 16, color: '#696969'});
      window.add(credit3);
      window.bringToTop(credit3);  
}