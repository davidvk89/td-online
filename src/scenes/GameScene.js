import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
        
    }
    init(data){
        this.character = data
    }
    create(){
        console.log('gamescene with: ' + this.character)
        
        this.player = this.physics.add.sprite(100, 200, this.character.textureKey, 0);
        this.player.direction;
        console.log(this.character)
   
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        
    }

    update(){


  this.player.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown || this.cursors.A.isDown)
        {
            this.player.body.setVelocityX(-80);
            this.player.direction = 'left';
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80); 
            this.player.direction = 'right'
        }
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
            this.player.direction = 'up';
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
            this.player.direction = 'down';
        }  
        
        
        if (this.cursors.left.isDown || this.cursors.A.isDown)
        {
            this.player.anims.play(this.character.textureKey +'-walk-left-animation', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play(this.character.textureKey +'-walk-right-animation', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play(this.character.textureKey +'-walk-up-animation', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play(this.character.textureKey +'-walk-down-animation', true);
        }
        else if(this.cursors.spaceBar.isDown){
            console.log(this.player.direction);
            console.log(this.character.textureKey +'-hammer-'+this.player.direction+'-animation')
            this.player.anims.play(this.character.textureKey +'-hammer-'+this.player.direction+'-animation', true);    
    }
        else
        {
            this.player.anims.stop();
        }
    }
}