import Sprite from './Sprite'

export default class Creature {
    constructor()
    {
        this.exp = 0;
        this.health = 100;

        // Common, uncommon, rare, epic, legendary
        this.rarity = 0;
        
        //  width, height, symmetry, noiseScale, nColours, speed, seed, nFrames
        this.sprite = new Sprite(32, 32, 'vertical', Math.random(), 5, 0.005, Math.random(), 60)
    }

}