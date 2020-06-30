import getSprite from './sketch'

export default class Creature {
    constructor()
    {
        this.sprite = getSprite();
        this.exp = 0;
        this.health = 100;
    }
}