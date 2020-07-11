import Sprite from './Sprite'
import MarkovChain from '../scripts/markov_chain_name_generator'

import randn_bm from '../scripts/custom_math_functions'
export default class Creature {
    constructor()
    {
        this.exp = 0;
        this.health = 100;

        this.todosMade = ['study', 'for', 'exams', 'abcdefghijklmnopqrstuvwxyz']
        var data = require('../scripts/pokemon.json')

        this.markov = new MarkovChain(data)
        this.name = this.markov.genNames[0]

        // Common, uncommon, rare, epic, legendary
        this.rarity = 0;
    
        // Size is correlated with rarity
        
        // min size: 4
        var randSize = 32

        var noisescale = Math.random()*0.3 + 0.2
        var nColors = 5
        var speed = Math.random()
        var seed = Math.random()
        var nFrames = 10+Math.ceil(Math.random()*0)

        var index = Math.floor(Math.random()*5)
        // index = 3
        var symmetry;
        // console.log(index)
        // index = 3
        if (index === 0)
        {
            symmetry = "quad"
        }
        else if (index === 1)
        {
            symmetry = "diagonal_left"
        }
        else if (index === 2)
        {
            symmetry = "diagonal_right"
        }
        else if (index === 3)
        {
            symmetry = "vertical"
        }
        else if (index === 4)
        {
            symmetry = "horizontal"
        }
        else if (index === 5)
        {
            symmetry = "none"
        }

        //  width, height, symmetry, noiseScale, nColours, speed, seed, nFrames
        this.sprite = new Sprite(randSize, randSize, symmetry, noisescale, nColors, speed, seed, nFrames)
    }

}