import "./perlin.js";
// import console = require("console");

class Sprite{
    constructor(pixWidth,pixHeight,seed,nColors, symmetry)
    {
        this.SpriteWidth = pixWidth;
        this.SpriteHeight = pixHeight;
        this.Seed = seed;
        this.Symmetry = symmetry;
        this.Graphics = [];
        this.nColors = nColors;
        this.colors = [];
        this.t = 0;
    }

    init()
    {
        noise.seed(this.Seed);
        for (let i = 0; i < this.nColors; i++)
        {
          this.colors.push([255,255-10*i,255])
          console.log(this.colors[this.colors.length-1])
          // colors.push(color(255, Math.random()*255, Math.random()*255))
        }

        // initialize graphics array
        for (let j = 0; j < this.SpriteWidth; j++)
        {
            this.Graphics[j] = [];
        }
    }
    
    iterate_step()
    {
        var centerX = this.SpriteWidth/2
        var centerY = this.SpriteHeight/2
    
        var iterateW;
        var iterateH;

        var noiseScale = 0.05;
    
        if (this.Symmetry == "vertical")
        {
          iterateW = this.SpriteWidth/2
          iterateH = this.SpriteHeight
        }

        for (let j = 0; j < iterateW; j++)
        {

            for (let i = 0; i < iterateH; i++)
            {
                var val  = (noise.perlin3(j*noiseScale,i*noiseScale, this.t)+1)/2;
                var distance = 1-Math.sqrt((j-centerX)**2+(i-centerY)**2)/Math.sqrt(centerX**2+centerY**2);

                // console.log(val,distance)
                var f = distance;
                var c = [0,0,0]
                if (val > f)
                {
                  // c = Math.floor(Math.random()*255)
                  c = [0,0,0]
                //   console.log("colors is " ,this.colors)

                }
                else
                {
                  // get color
                  for (let p = 0; p < this.colors.length; p++)
                  {
                    if (val < p/this.colors.length)
                    {

                      c = this.colors[p]
                    //   console.log("colors is " ,this.colors)
                      break
                    }
                  }

                }
                this.Graphics[j][i] = c
                this.Graphics[this.SpriteWidth-j-1][i] = c
    
            }
            
        }
        this.t += 0.01
    }

}

// Returns a 2D array of graphics
export default function getSprite(w,h,seed,nCols, symmetry){

    var mySprite = new Sprite(w,h,seed,nCols, symmetry)
    mySprite.init();
    mySprite.iterate_step();
    return mySprite;
}