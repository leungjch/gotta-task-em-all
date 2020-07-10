import Sprite from './Sprite'
import MarkovChain from '../scripts/markov_chain_name_generator'

import randn_bm from '../scripts/custom_math_functions'
export default class Creature {
    constructor()
    {
        this.exp = 0;
        this.health = 100;

        var data = require('../scripts/pokemon.json')

        this.markov = new MarkovChain(data)
        this.name = this.markov.genNames[0]

        // Common, uncommon, rare, epic, legendary
        this.rarity = 0;
    
        // Size is correlated with rarity
        
        // min size: 4
        var randSize = Math.ceil(Math.random()*32)+8

        var index = Math.floor(Math.random()*5)
        var symmetry;
        switch (index)
        {
            case 0:
                symmetry = "none"
            case 1:
                symmetry = "diagonal_left"
            case 2:
                symmetry = "diagonal_right"
            case 3:
                symmetry = "horizontal"
            case 4:
                symmetry = "vertical"
            case 5:
                symmetry = "quad"
        }


        //  width, height, symmetry, noiseScale, nColours, speed, seed, nFrames
        this.sprite = new Sprite(randSize, randSize, symmetry, Math.random()*0.5, Math.ceil(Math.random()*10), Math.random()*0.2, Math.random(), 10+Math.ceil(Math.random()*15))
    }

}