//base character class 

var playableCharacters = []

//captcha card class
    class sburbCharacter  extends Phaser.GameObjects.Sprite{
        constructor(scene, x, y, texture, item) {
            
            super(scene, x, y, texture,);
            this.setPosition(x,y);
            this.setTexture(texture);
            this.item = item;
            
            
            //put the character to the full array
            this.pushToList = function() {
                playableCharacters.push(this);
            }
            this.pushToList();
            
        }
    }
    
class karkat extends sburbCharacter {
         constructor(x, y, name, health, texture) {
             //let the base class handle the main characteristics
             super(x, y, name, health, texture)
             
            //interaction
            this.interact = function(x,y) {
                   // console.log("opening crafting table");
                  //  if (player.wood >= 2){
                  //      player.inventory.push("wooden pickaxe");
                 //       player.wood -= 2;
                 //       console.log("obtained wooden pickaxe!");
                 //   }
            }
            //on destruction
            this.destruct = function() {
                
            }
         }
}

 //self.physics.add.sprite(playerInfo.x, playerInfo.y, 'karkat').play('kk_down_idle');