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
        this.noiseScale = noisescale;

        // Perlin noise parameter - each creature has different seed
        this.seed = seed;

        // How fast the creature moves
        this.speed = speed

        // Background colour

        // Generate a color palette from nColours
        this.colors = []
        randCol1 = Math.ceil(Math.random()*255)
        randCol2 = Math.ceil(Math.random()*255)
        randCol3 = Math.ceil(Math.random()*255)
        this.backgroundCol = [255-randCol1,255-randCol2,255-randCol3]

        for (let i = 0; i < this.nColors; i++)
        {
            this.colors.push([randCol1-10*i,randCol2-50*i,randCol3-10*i])
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

        var iterW;
        var iterH;

        var offset = Math.random()

        if (this.symmetry === "none" || this.symmetry === "diagonal_left" || this.symmetry === "diagonal_right")
        {
            iterW = this.spriteWidth;
            iterH = this.spriteHeight;
        }
        if (this.symmetry === "vertical")
        {
            iterW = this.spriteWidth/2;
            iterH = this.spriteHeight;
        }
        if (this.symmetry === "horizontal")
        {
            iterW = this.spriteWidth;
            iterH = this.spriteHeight/2;
        }
        if (this.symmetry === "quad")
        {
            iterW = this.spriteWidth/2;
            iterH = this.spriteHeight/2;
        }
        noise.seed(this.seed);

        for (var frame = 0; frame < nFrames; frame++)
        {
            // Store noise values
            vals = [];

            // Iterate through Sprite and generate values
            for (var j = 0; j < iterW; j++)
            {
                vals[j] = []
                
                if (this.symmetry === "vertical" || this.symmetry === "quad")
                {
                    vals[this.spriteWidth-1-j] = []
                }

                for (var i = 0; i < iterH; i++)
                {
                    // Sample perlin or simplex noise
                    // val = (noise.simplex3(j*noiseScale,i*noiseScale, t)+1)/2;
                    val = (noise.perlin3(j*this.noiseScale,i*this.noiseScale, this.time)+1)/2;
                    // Get pixel distance from center
                    var distance = 1-Math.sqrt((j-centerX)**2+(i-centerY)**2);

                    // Set falloff function
                    var f = Math.exp(distance/(this.spriteWidth/4));


                    // Reciprocal distance
                    // f = 5/(Math.sqrt(1*(j-centerX)**2 + 2*(i-centerY)**2))

                    // Gaussian falloff
                    // f = 1*Math.exp(-1*0.2*Math.sqrt(2*(j-centerX)**2+(i-centerY)**2)**2)


                    var c;

                    // If value is greater than falloff, then it is empty (background)
                    if (val > f)
                    {
                        c = this.backgroundCol
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
                    if (this.symmetry === "vertical")
                    {
                        vals[this.spriteWidth-1-j][i] = c
                    }
                    if (this.symmetry === "horizontal")
                    {
                        vals[j][this.spriteHeight-1-i] = c 
                    }
                    if (this.symmetry === "diagonal_right")
                    {
                        if (typeof(vals[i]) === 'undefined')
                        {
                            vals[i] = []
                        }
                        vals[i][j] = c 
                    }
                    if (this.symmetry === "diagonal_left")
                    {
                        if (typeof(vals[this.spriteHeight-1-i]) === 'undefined')
                        {
                            vals[this.spriteHeight-1-i] = []
                        }
                        vals[this.spriteHeight-1-i][this.spriteWidth-1-j] = c 
                    }
                    if (this.symmetry === "quad")
                    {
                        // top right
                        vals[this.spriteWidth-1-j][i] = c

                        // bottom left
                        vals[j][this.spriteHeight-1-i] = c 

                        // bottom right
                        vals[this.spriteWidth-1-j][this.spriteHeight-1-i] = c 
                    }
                }
            }
            // oscillate
            this.time = (Math.sin((Math.PI/nFrames)*frame+offset))*this.speed
            
            // Add a frame of the sprite animation
            this.spriteSheet.push(vals)
        }
    }
    

}