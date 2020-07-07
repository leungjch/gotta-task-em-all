
import {module} from '../scripts/perlin'


// Sprite generation
export default class Sprite {
    constructor(width, height, symmetry, noisescale, ncolors, speed, seed, nFrames)
    {
        this.spriteHeight = width;
        this.spriteWidth = height;

        // Value: 'horizontal', 'vertical', 'diagonal', 'none'
        this.symmetry = symmetry;

        // Higher number of colours creates a  smooth 'gradient' whereas few creates regions like a topographic map
        this.nColors = ncolors;

        // Perlin noise parameter: lower = smoother, higher = spikier
        // Between 0 and 1
        // this.noiseScale = noisescale;
        this.noiseScale = 0.05;

        // Perlin noise parameter - each creature has different seed
        this.seed = seed;

        // How fast the creature moves
        this.speed = speed

        // Generate a color palette from nColours
        this.colors = []
        for (let i = 0; i < this.nColors; i++)
        {
            this.colors.push([255,255-50*i,255])
          // colors.push(color(255, Math.random()*255, Math.random()*255))
        }

        // latest time
        this.time = 0;

        // Stores the animation frames of a creature
        this.spriteSheet = [] 
        this.generateSpritesheet(nFrames)

    }

    // Generate animation of a sprite
    generateSpritesheet(nFrames)
    {
        var centerX = this.spriteWidth/2;
        var centerY = this.spriteHeight/2;
    
        noise.seed(this.seed);
        
        for (var frame = 0; frame < nFrames; frame++)
        {
            // Store noise values
            vals = [];

            // Iterate through Sprite and generate values
            for (var j = 0; j < this.spriteWidth/2; j++)
            {
                vals[j] = []

                vals[this.spriteWidth-1-j] = []
                for (var i = 0; i < this.spriteHeight; i++)
                {
                    // Sample perlin or simplex noise
                    // val = (noise.simplex3(j*noiseScale,i*noiseScale, t)+1)/2;
                    val = (noise.perlin3(j*this.noiseScale,i*this.noiseScale, this.time)+1)/2;
                    // Get pixel distance from center
                    var distance = 1-Math.sqrt((j-centerX)**2+(i-centerY)**2)/Math.sqrt(centerX**2+centerY**2);

                    // Set falloff function
                    var f = distance;
                    var c;

                    // If value is greater than falloff, then it is empty (background)
                    if (val > f)
                    {
                        c = [255,255,255]
                    }
                    // If less than falloff, it is part of sprite body
                    else
                    {
                        // get color
                        for (let p = 0; p < this.colors.length; p++)
                        {
                            if (val < p/this.colors.length)
                            {

                            c = this.colors[p]
                            break
                            }
                        }

                    }

                    vals[j][i] = c
                    vals[this.spriteWidth-1-j][i] = c
                }
            }
            // oscillate
            this.time = (Math.sin((Math.PI/nFrames)*frame))
            
            // Add a frame of the sprite animation
            this.spriteSheet.push(vals)
        }
    }
    

}