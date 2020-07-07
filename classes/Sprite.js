
// Info for a sprite
export default class Sprite {
    constructor(width, height, symmetry, noisescale, seed)
    {
        this.spriteHeight = width;
        this.spriteWidth = height;
        this.symmetry = symmetry;
        this.seed = seed;
        this.noiseScale = noisescale;
        this.graphics = []
    }

}