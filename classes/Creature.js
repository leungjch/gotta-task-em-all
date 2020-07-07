import Sprite from './Sprite'

export default class Creature {
    constructor()
    {
        this.exp = 0;
        this.health = 100;

        // Common, uncommon, rare, epic, legendary
        this.rarity = 0;
        
        this.sprite = new Sprite()
    }

}