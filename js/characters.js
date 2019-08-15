//base character class 

var playableCharacters = []

//captcha card class
    class sburbCharacter extends Phaser.Physics.Arcade.    Sprite{
        constructor(scene, x, y, character) {
            
            let texture = character.name;
            //send  position to Sprite class
            super(scene, x, y, texture);
            
            //add this to the scene
            self.add.existing(this);
            self.physics.add.existing(this);          
                        
            //set the texture to the character
            this.setTexture(character.name);
            
            //set up sburb's custom variables 
            this.color = (character.color);
            
      
                //set up the main animations
                this.down_idle = character.down_idle;
                this.right_idle = character.right_idle;
                this.left_idle = character.left_idle;
                this.up_idle = character.up_idle;
                
                this.down_walk = character.down_walk;
                this.right_walk = character.right_walk;
                this.left_walk = character.left_walk;
                this.up_walk = character.up_walk;
               
                

    }
    
        //changing characters
   changeCharacter(newCharacter){
       //swap out texture and animations
        console.log(`changing ${this} to ${newCharacter.name}`);
        console.log(newCharacter);
      
        this.setTexture(newCharacter.name);
       
        this.down_idle = newCharacter.down_idle;
        this.right_idle = newCharacter.right_idle;
        this.left_idle = newCharacter.left_idle;
        this.up_idle = newCharacter.up_idle;
        
        this.down_walk = newCharacter.down_walk;
        this.right_walk = newCharacter.right_walk;
        this.left_walk = newCharacter.left_walk;
        this.up_walk = newCharacter.up_walk;
        
        //this.play(this.down_idle);

   }
           
}    
    
    
//CHARACTERS//


//characters are stored as objects, they will be passed to the sburbCharacter as the properties when a new player chooses them

    //KARKAT//

const karkat = {
    //name must match the atlas that was loaded
    name: "karkat",
    //color for text chat and other things maybe
    color: "#626262",
    
    //animation names as defined in your json
    //currently required: 4-direction idle, 4-direction walk
    //currently unused: 4-direction talk, sleep anim
    down_idle: "kk_down_idle",
    right_idle: "kk_right_idle",
    left_idle: "kk_left_idle",
    up_idle: "kk_up_idle",
    
    down_walk: "kk_down_walk",
    right_walk: "kk_right_walk",
    left_walk: "kk_left_walk",
    up_walk: "kk_up_walk"

    
}
    //add to the list of playable characters. this is used to build the character select menu
    //leave this out if you don't want your character in the main select menu (for special gamemodes, admin skins, etc.)
playableCharacters.push(karkat);

//TEREZI//
const terezi = {
    
    name: "terezi",
    color: "#008282",
    
    down_idle: "tz_down_idle",
    right_idle: "tz_right_idle",
    left_idle: "tz_left_idle",
    up_idle: "tz_up_idle",
    
    down_walk: "tz_down_walk",
    right_walk: "tz_right_walk",
    left_walk: "tz_left_walk",
    up_walk: "tz_up_walk"

    
}
playableCharacters.push(terezi);

//note to self: this is aradiabot from alterniabound. need unique names for openbound sprites later
//ARADIA//
const aradia = {
    
    name: "aradia",
    color: "#a10000",
    
    down_idle: "aradia_down_idle",
    right_idle: "aradia_right_idle",
    left_idle: "aradia_left_idle",
    up_idle: "aradia_up_idle",
    
    down_walk: "aradia_down_walk",
    right_walk: "aradia_right_walk",
    left_walk: "aradia_left_walk",
    up_walk: "aradia_up_walk"

    
}
playableCharacters.push(aradia);

const vriska = {
    
    name: "vriska",
    color: "#a10000",
    
    down_idle: "vriska_down_idle",
    right_idle: "vriska_right_idle",
    left_idle: "vriska_left_idle",
    up_idle: "vriska_up_idle",
    
    down_walk: "vriska_down_walk",
    right_walk: "vriska_right_walk",
    left_walk: "vriska_left_walk",
    up_walk: "vriska_up_walk"

    
}
playableCharacters.push(vriska);