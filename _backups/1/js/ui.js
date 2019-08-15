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
    },
    
    create: function(){
        
       textbox = this.add.sprite(-1000, -1000, 'textbox');
       currentText = this.add.bitmapText(-1000, -1000, 'courier', '', 24).setTint(0x008282);
       
       //FULLSCREEN
       fullscreenButton = this.add.sprite(575, 50, "fullscreen").setInteractive();
        
       fullscreenButton.on('pointerdown', function(){
            currentScene.scale.toggleFullscreen();
   });
  
       
    }
})