
//array to store playable characters in, used to build  Char. Select Screen
var playableCharacters = []

    //base character class 
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
        if(newCharacter.name == undefined){
            newCharacter = newCharacter.character;
        }

      

        this.setTexture(newCharacter.name);
       
        this.down_idle = newCharacter.down_idle;
        this.right_idle = newCharacter.right_idle;
        this.left_idle = newCharacter.left_idle;
        this.up_idle = newCharacter.up_idle;
        
        this.down_walk = newCharacter.down_walk;
        this.right_walk = newCharacter.right_walk;
        this.left_walk = newCharacter.left_walk;
        this.up_walk = newCharacter.up_walk;
        
        this.color = newCharacter.color;
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

//TAVROS//
const tavros = {
    
    name: "tavros",
    color: "#a15000",
    
    down_idle: "tavros_down_idle",
    right_idle: "tavros_right_idle",
    left_idle: "tavros_left_idle",
    up_idle: "tavros_up_idle",
    
    down_walk: "tavros_down_walk",
    right_walk: "tavros_right_walk",
    left_walk: "tavros_left_walk",
    up_walk: "tavros_up_walk"

    
}
playableCharacters.push(tavros);

//SOLLUX//
const sollux = {
    
    name: "sollux",
    color: "#a15000",
    
    down_idle: "sollux_down_idle",
    right_idle: "sollux_right_idle",
    left_idle: "sollux_left_idle",
    up_idle: "sollux_up_idle",
    
    down_walk: "sollux_down_walk",
    right_walk: "sollux_right_walk",
    left_walk: "sollux_left_walk",
    up_walk: "sollux_up_walk"

    
}
playableCharacters.push(sollux);

//NEPETA//
const nepeta = {
    
    name: "nepeta",
    color: "#416600",
    
    down_idle: "nepeta_down_idle",
    right_idle: "nepeta_right_idle",
    left_idle: "nepeta_left_idle",
    up_idle: "nepeta_up_idle",
    
    down_walk: "nepeta_down_walk",
    right_walk: "nepeta_right_walk",
    left_walk: "nepeta_left_walk",
    up_walk: "nepeta_up_walk",
    
}
playableCharacters.push(nepeta);

//KANAYA//
const kanaya = {
    
    name: "kanaya",
    color: "#008141",
    
    down_idle: "kanaya_down_idle",
    right_idle: "kanaya_right_idle",
    left_idle: "kanaya_left_idle",
    up_idle: "kanaya_up_idle",
    
    down_walk: "kanaya_down_walk",
    right_walk: "kanaya_right_walk",
    left_walk: "kanaya_left_walk",
    up_walk: "kanaya_up_walk"

    
}
playableCharacters.push(kanaya);

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


//VRISKA//
const vriska = {
    
    name: "vriska",
    color: "#005682",
    
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

//EQUIUS//
const equius = {
    
    name: "equius",
    color: "#000056",
    
    down_idle: "equius_down_idle",
    right_idle: "equius_right_idle",
    left_idle: "equius_left_idle",
    up_idle: "equius_up_idle",
    
    down_walk: "equius_down_walk",
    right_walk: "equius_right_walk",
    left_walk: "equius_left_walk",
    up_walk: "equius_up_walk"

    
}
playableCharacters.push(equius);

//GAMZEE//
const gamzee = {
    
    name: "gamzee",
    color: "#2b0057",
    
    down_idle: "gamzee_down_idle",
    right_idle: "gamzee_right_idle",
    left_idle: "gamzee_left_idle",
    up_idle: "gamzee_up_idle",
    
    down_walk: "gamzee_down_walk",
    right_walk: "gamzee_right_walk",
    left_walk: "gamzee_left_walk",
    up_walk: "gamzee_up_walk"

    
}
playableCharacters.push(gamzee);

//ERIDAN//
const eridan = {
    
    name: "eridan",
    color: "#6a006a",
    
    down_idle: "eridan_down_idle",
    right_idle: "eridan_right_idle",
    left_idle: "eridan_left_idle",
    up_idle: "eridan_up_idle",
    
    down_walk: "eridan_down_walk",
    right_walk: "eridan_right_walk",
    left_walk: "eridan_left_walk",
    up_walk: "eridan_up_walk"

    
}
playableCharacters.push(eridan);

//FEFERI//
const feferi= {
    
    name: "feferi",
    color: "#77003c",
    
    down_idle: "feferi_down_idle",
    right_idle: "feferi_right_idle",
    left_idle: "feferi_left_idle",
    up_idle: "feferi_up_idle",
    
    down_walk: "feferi_down_walk",
    right_walk: "feferi_right_walk",
    left_walk: "feferi_left_walk",
    up_walk: "feferi_up_walk"

    
}
playableCharacters.push(feferi);



//HUMANS//


//JOHN//
const john = {
    name: "john",

    color: "#0715cd",
    
    //currently required: 4-direction idle, 4-direction walk
    //currently unused: 4-direction talk, sleep anim
    down_idle: "john_down_idle",
    right_idle: "john_right_idle",
    left_idle: "john_left_idle",
    up_idle: "john_up_idle",
    
    down_walk: "john_down_walk",
    right_walk: "john_right_walk",
    left_walk: "john_left_walk",
    up_walk: "john_up_walk",

    animtype: "template"

}
playableCharacters.push(john);

//JOHN GODTIER//
const john_gt = {
    name: "john_gt",

    color: "#0715cd",
    
    //currently required: 4-direction idle, 4-direction walk
    //currently unused: 4-direction talk, sleep anim
    down_idle: "john_gt_down_idle",
    right_idle: "john_gt_right_idle",
    left_idle: "john_gt_left_idle",
    up_idle: "john_gt_up_idle",
    
    down_walk: "john_gt_down_walk",
    right_walk: "john_gt_right_walk",
    left_walk: "john_gt_left_walk",
    up_walk: "john_gt_up_walk",

    animtype: "template"

}
playableCharacters.push(john_gt);

//ROSE GRIMDARK//
const rose_gd = {
    name: "rose_gd",

    color: "#b536da",
    
    //currently required: 4-direction idle, 4-direction walk
    //currently unused: 4-direction talk, sleep anim
    down_idle: "rose_gd_down_idle",
    right_idle: "rose_gd_right_idle",
    left_idle: "rose_gd_left_idle",
    up_idle: "rose_gd_up_idle",
    
    down_walk: "rose_gd_down_walk",
    right_walk: "rose_gd_right_walk",
    left_walk: "rose_gd_left_walk",
    up_walk: "rose_gd_up_walk",

    animtype: "template"

}
playableCharacters.push(rose_gd);

//JACK//
const jack = {
    name: "jack",

    color: "black",
    
    //currently required: 4-direction idle, 4-direction walk
    //currently unused: 4-direction talk, sleep anim
    down_idle: "jack_down_idle",
    right_idle: "jack_right_idle",
    left_idle: "jack_left_idle",
    up_idle: "jack_up_idle",
    
    down_walk: "jack_down_walk",
    right_walk: "jack_right_walk",
    left_walk: "jack_left_walk",
    up_walk: "jack_up_walk",

    animtype: "template"

}
playableCharacters.push(jack);

//horuss//
const horuss = {
    name: "horuss",

    color: "#000056",
    
    //currently required: 4-direction idle, 4-direction walk
    //currently unused: 4-direction talk, sleep anim
    down_idle: "horuss_down_idle",
    right_idle: "horuss_right_idle",
    left_idle: "horuss_left_idle",
    up_idle: "horuss_up_idle",
    
    down_walk: "horuss_down_walk",
    right_walk: "horuss_right_walk",
    left_walk: "horuss_left_walk",
    up_walk: "horuss_up_walk",

    animtype: "template"

}
playableCharacters.push(horuss);

//then we add the characters to sets, these group characters for pages of character select
    //current cap 12
    const charTrollBeta = [aradia, tavros, sollux, karkat, nepeta, kanaya, terezi, vriska, equius, gamzee, eridan, feferi];
    const charHuman = [john, john_gt, rose_gd, horuss];
    const charMisc = [jack, horuss];
    const charTrollAlpha = [horuss, horuss, horuss, horuss, horuss, horuss, horuss, horuss, horuss, horuss, horuss, horuss]

function loadCharacters(){
  //load every character, each needs a Data json with the animations, a png witht the sprites, and a json atlas for the spritesheet
  //the atlas name should match the characters name in character.js
  playableCharacters.forEach(char => {
    //loads the character's images and animations when the game begins
    //note that the names are currently spell and case sensitive
    self.load.atlas(`${char.name}`, `assets/characters/${char.name}.png`, `assets/characters/${char.name}_atlas.json`);
    self.load.animation(`${char.name}Data`, `assets/characters/${char.name}_anim.json`);





    /*Experiment Failed, Come back to this later*/

    /*
    if(char.animtype != "template"){
        //old anim type: saved in an external json
        self.load.atlas(`${char.name}`, `assets/characters/${char.name}.png`, `assets/characters/${char.name}_atlas.json`);

        self.load.animation(`${char.name}Data`, `assets/characters/${char.name}_anim.json`);
    }else{
        //new anim type: created here in Phaser! Eventually will help implement custom stuff
        self.load.atlas(`${char.name}`, `assets/characters/${char.name}.png`, `assets/characters/${char.name}_atlas.json`);

        console.log(`creating anims for ${char.name}`);

        self.anims.create({
                key: `${char.name}_down_idle`,
                frames: [{key: `${char.name}`, frame: `${char.name}_down_idle`}],
                frameRate: 8,
                repeat: -1
        });

        self.anims.create({
                key: `${char.name}_down_walk`,
                frames: [{key: `${char.name}`, frame: `${char.name}_down_walk1`}, {key: `${char.name}`, frame: `${char.name}_down_walk2`}],
                //frames: self.anims.generateFrameNames(`${char.name}`, { prefix: `${char.name}_down_walk`, start: 1, end: 2, zeroPad: 1 }),
                frameRate: 8,
                repeat: -1
                });

        console.log(self.anims);
        }
        */




    });
}