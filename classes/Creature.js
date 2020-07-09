import Sprite from './Sprite'

import randn_bm from '../scripts/custom_math_functions'
export default class Creature {
    constructor()
    {
        this.exp = 0;
        this.health = 100;

        // Common, uncommon, rare, epic, legendary
        this.rarity = 0;
    
        // Size is correlated with rarity
        
        // min size: 4
        var randSize = 16

        //  width, height, symmetry, noiseScale, nColours, speed, seed, nFrames
        this.sprite = new Sprite(randSize, randSize, 'vertical', Math.random()*0.5, Math.ceil(Math.random()*10), 0.001, Math.random(), 10)
    }

}