import Phaser from "phaser";

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelectScene');
  }
  create() {
    this.graphics = this.add.graphics();
    //loads the characters JSON
    this.testvalue = 1;
    const character_slots_data = this.cache.json.get('character_data');
    console.log(character_slots_data)
    //create character slot graphics
    //IMPORTANT: use containers(slot) X and Y coordinates to move all children relative to the container.
    //let's do some math so our objects align relatively and are easy to update and test.
    const slotY = 96;
    const slot1X = 128; const slot2X = 256; const slot3X = 384;
    const slotWidth = 120; const slotHeight = 148;

    const slotNameDifferential = 4;
    const slot1NameX = slot1X + slotNameDifferential;
    const slot2NameX = slot2X + slotNameDifferential;
    const slot3NameX = slot3X + slotNameDifferential;
    const SlotNameY = slotY + slotNameDifferential;  //only one Y because our sprites are all on the same height.

    const slotSpriteXDifferential = 60;
    const slotSpriteYdifferential = 64;
    const slot1SpriteX = slot1X + slotSpriteXDifferential;
    const slot2SpriteX = slot2X + slotSpriteXDifferential;
    const slot3SpriteX = slot3X + slotSpriteXDifferential;
    const slotSpriteY = slotY + slotSpriteYdifferential;  //only one Y because our sprites are all on the same height.

    const slotClassAndLevelXDifferential = 4
    const slotClassAndLevelYDifferential = 113;
    const slot1ClassAndLevelX = slot1X + slotClassAndLevelXDifferential;
    const slot2ClassAndLevelX = slot2X + slotClassAndLevelXDifferential;
    const slot3ClassAndLevelX = slot3X + slotClassAndLevelXDifferential;
    const slotClassAndLevelY = slotY + slotClassAndLevelYDifferential;

    this.add.text(32, 16, "Choose or create a character", {
      "fontFamily": "fantasy",
      "fontSize": "36px"
    });
    this.add.text(32, 54, "Click the character to start or select create.", {
      "fontFamily": "fantasy",
      "fontSize": "16px"
    })

    //create box graphics that serve as containers for nameplates, sprites and character info.
    this.createSlotBox(slot1X, slotY, slotWidth, slotHeight);
    this.createSlotBox(slot2X, slotY, slotWidth, slotHeight);
    this.createSlotBox(slot3X, slotY, slotWidth, slotHeight)

    //slot 1
    if(character_slots_data.slot_1.character_id === 0){
      let slot_1 = this.createNewCharacter(slot1SpriteX, slotSpriteY, 1)
      
    } else {
      this.createNamePlate(slot1NameX, slotY, character_slots_data.slot_1.name);
      let slot_1 = this.createSlotModel(slot1SpriteX, slotSpriteY, character_slots_data.slot_1.textureKey, 0);
      slot_1.characterJSON = character_slots_data.slot_1;
    }
    //slot 2
    if(character_slots_data.slot_2.character_id === 0){
      this.createNewCharacter(slot2SpriteX, slotSpriteY, 2)
    } else {
      this.createNamePlate(slot2NameX, slotY, character_slots_data.slot_2.name);
      let slot_2 = this.createSlotModel(slot2SpriteX, slotSpriteY, character_slots_data.slot_2.textureKey, 0);
      slot_2.characterJSON = character_slots_data.slot_2;
    }
    //slot 3
    if(character_slots_data.slot_3.character_id === 0){
      this.createNewCharacter(slot3SpriteX, slotSpriteY, 3)
    } else {
      this.createNamePlate(slot3NameX, slotY, character_slots_data.slot_3.name);
      let slot_3 = this.createSlotModel(slot3SpriteX, slotSpriteY, character_slots_data.slot_3.textureKey, 0);
      slot_3.characterJSON = character_slots_data.slot_3;
    }

    this.input.on('gameobjectdown', this.startGame, this);
  } // end create

  createSlotBox(x, y, width, height) {
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x535353, 1);
    this.graphics.strokeRect(x, y, width, height);
    this.graphics.fillRect(x, y, width, height);
  }

  createNamePlate(x, y, name) {

    let lenght = JSON.stringify(name);
    let maxSize = 12
    let number = lenght.length;

    if (number > maxSize) {
      let difference = number - maxSize;
      name = name.slice(0, -difference);
      this.add.text(x, y, name + "..");
    } else {
      this.add.text(x, y, name);
    }


  }

  createClassAndLevelInfo(x, y, characterClass, level) {
    if (level) {
      this.add.text(x, y, "level " + level);
      this.add.text(x, y + 16, characterClass);
    }
  }

  createSlotModel(x, y, textureKey, frame) {
    let animationKey = textureKey + "-walk-down-animation";
    let model = this.add.sprite(x, y, textureKey, frame);
    model.play(animationKey);
    model.setInteractive();
    return model;
  }

  createNewCharacter(x, y, slot) {
    this.add.text(x - 48, y - 60, "empty slot");
    let newCharacter = this.add.sprite(x, y, 'create_character_button');
    let json = { action: "create" };
    // @ts-ignore
    newCharacter.characterJSON = json;
    newCharacter.slot = slot;
    newCharacter.setInteractive();
  }

  startGame(pointer, gameObject) {
    let action = gameObject.characterJSON.action;
    console.log("start game perform this action: " + action)

    if (action === "create") {
      console.log("creating a new character in this slot: " + gameObject.slot);
      this.scene.start("CharacterCreateScene", gameObject.slotKey) //start character creation scene if create character is clicked
    } else {
      console.log('starting game wtih this character: ' + JSON.stringify(gameObject.characterJSON));
      this.scene.start('GameScene', gameObject.characterJSON)  //start game scene if existing character is clicked
    }
  }
}//end class