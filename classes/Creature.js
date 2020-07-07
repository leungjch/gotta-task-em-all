import Sprite from './Sprite'

export default class Creature {
    constructor()
    {
        this.exp = 0;
        this.health = 100;

        // Common, uncommon, rare, epic, legendary
        this.rarity = 0;
        
        //  width, height, symmetry, noiseScale, nColours, speed, seed, nFrames
        this.sprite = new Sprite(64, 64, 'vertical', Math.random(), 5, 0.1, Math.random(), 10)
    }

}