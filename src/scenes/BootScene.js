import Phaser from 'phaser'
import Cookies from 'js-cookie'


const API_route_characters_fetch = "http://localhost/pixel_universes_pi/api/character/fetch.php?token="+Cookies.get('auth');

export default class BootScene extends Phaser.Scene {
	constructor() {
		super('BootScreen')
	}

	preload() {
		
		this.load.json('character_data',API_route_characters_fetch);
        this.load.html('nameForm', "forms/name.html");
        this.load.html("classSelect", "forms/class.html");

        this.load.spritesheet('create_character_button', "assets/buttons/create_new_character.png", {
            frameWidth:77,
            frameHeight: 38
        });
        this.load.image('back_to_character_select', "assets/buttons/cancel_character_creation.png");
        this.load.atlas("test", "assets/characters/test/test.png", "assets/characters/test/test.json");
        //player character atlasses.
        this.load.atlas("male_1", "assets/characters/male/outfit_1/spritesheet.png", "assets/characters/male/outfit_1/atlas.json");
        this.load.atlas("female_1", "assets/characters/female/outfit_1/spritesheet.png", "assets/characters/female/outfit_1/atlas.json");
   
    }

    create(){
      const frameRate = 10;
    //start building animations. It's a long, long looooong list.
     this.anims.create({
        key: "male_1-walk-down-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "walk-down/",
            suffix: ".png",
            start: 3,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "male_1-walk-left-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "walk-left/",
            suffix: ".png",
            start: 1,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "male_1-walk-up-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "walk-up/",
            suffix: ".png",
            start: 3,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "male_1-walk-right-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "walk-right/",
            suffix: ".png",
            start: 1,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "male_1-hammer-up-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "hammer-up/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "male_1-hammer-left-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "hammer-left/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        
        repeat: -1
      })
      this.anims.create({
        key: "male_1-hammer-down-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "hammer-down/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        
        repeat: -1
      })
      this.anims.create({
        key: "male_1-hammer-right-animation",
        frames: this.anims.generateFrameNames("male_1", {
            prefix: "hammer-right/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        
        repeat: -1
      })

      this.anims.create({
        key: "female_1-walk-down-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "walk-down/",
            suffix: ".png",
            start: 3,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "female_1-walk-left-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "walk-left/",
            suffix: ".png",
            start: 1,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "female_1-walk-up-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "walk-up/",
            suffix: ".png",
            start: 3,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "female_1-walk-right-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "walk-right/",
            suffix: ".png",
            start: 1,
            end: 9,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "female_1-hammer-up-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "hammer-up/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        repeat: -1
      })
      this.anims.create({
        key: "female_1-hammer-left-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "hammer-left/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        
        repeat: -1
      })
      this.anims.create({
        key: "female_1-hammer-down-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "hammer-down/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        
        repeat: -1
      })
      this.anims.create({
        key: "female_1-hammer-right-animation",
        frames: this.anims.generateFrameNames("female_1", {
            prefix: "hammer-right/",
            suffix: ".png",
            start: 1,
            end: 6,
            zeroPad: 2,
        }),
        frameRate: frameRate,
        
        repeat: -1
      })
      
      this.add.sprite(32,32,'male_1').anims.play('male_1-walk-down-animation');
      this.add.sprite(32,96,'male_1').anims.play('male_1-walk-left-animation');
      this.add.sprite(32,160,'male_1').anims.play('male_1-walk-up-animation');
      this.add.sprite(32,224,'male_1').anims.play('male_1-walk-right-animation');
      
      this.add.sprite(96,32,'male_1').anims.play('male_1-hammer-up-animation');
      this.add.sprite(96,96,'male_1').anims.play('male_1-hammer-left-animation');
      this.add.sprite(96,160,'male_1').anims.play('male_1-hammer-down-animation');
      this.add.sprite(96,224,'male_1').anims.play('male_1-hammer-right-animation');


      this.add.sprite(232,32,'female_1').anims.play('female_1-walk-down-animation');
      this.add.sprite(232,96,'female_1').anims.play('female_1-walk-left-animation');
      this.add.sprite(232,160,'female_1').anims.play('female_1-walk-up-animation');
      this.add.sprite(232,224,'female_1').anims.play('female_1-walk-right-animation');
      
      this.add.sprite(296,32,'female_1').anims.play('female_1-hammer-up-animation');
      this.add.sprite(296,96,'female_1').anims.play('female_1-hammer-left-animation');
      this.add.sprite(296,160,'female_1').anims.play('female_1-hammer-down-animation');
      this.add.sprite(296,224,'female_1').anims.play('female_1-hammer-right-animation');
      
      this.scene.start('CharacterSelectScene');
    }

    
}