import Phaser from "phaser";

export default class CharacterSelectScene extends Phaser.Scene{
    constructor(){
        super('CharacterCreateScene');
        
    }
    init(data){
        this.characterSlot = data;
    }
    create(){
        this.add.text(32, 32, 'Create a new character', {
            "fontFamily":"fantasy",
            "fontSize":"32px",
            "color": "#FFF"
        });
        this.add.text(32, 105, "choose a class");
        const classSelect = this.add.dom(64, 135).createFromCache('classSelect');
        
        this.add.text(32, 151, "Enter a name");
        const nameInput = this.add.dom(116, 181).createFromCache('nameForm');

        let next = this.add.image(70, 236, "create_character_button");
        next.action = "next";
        next.setInteractive();
    
        let cancel = this.add.image(156,236, 'back_to_character_select');
        cancel.action = "cancel";
        cancel.setInteractive();  

       
        this.input.on('gameobjectdown', this.doThis, this);
    }
    
async doThis(pointer, gameObject){
    console.log(gameObject.action);

    if(gameObject.action === 'next'){
       let response = await fetch('http://localhost/rpg_server/test.php');
       console.log(await response.text());
    }

    if(gameObject.action === "cancel"){
        this.scene.start('CharacterSelectScene');
    }
}


 }
