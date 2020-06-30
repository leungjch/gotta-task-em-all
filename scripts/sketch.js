var WORLDWIDTH = 4; // number of tiles (cells) 
var WORLDHEIGHT = 8;

var SPRITEWIDTH = WORLDWIDTH*2+2; // include two border outlines
var SPRITEHEIGHT = WORLDHEIGHT+2;

var SHOW_GRID = false;
var framerate = 60;
var WIDTH, HEIGHT, GRIDSIZE;

if (SHOW_GRID)
{
   WIDTH = 1920;
   HEIGHT = 1080;
   GRIDSIZE = WIDTH/SPRITEWIDTH/4;

}
else
{
 WIDTH = SPRITEWIDTH*1;
 HEIGHT = SPRITEHEIGHT*1;
 GRIDSIZE = 1;

}


var sprite = [] // a 2D array containing the complete sprite (including )

var max_iteration = 2; // stop after 3 iterations
var finished = false;
var time = 0;

// Implements a cellular automata system
class Cellular_Automata
{
    // specify x,y position, initial state
    constructor(tempconfig, neighborhood)
    {
        this.config = tempconfig;
        this.neighborhood = neighborhood;

        // a 2D array that cells that can be dead or alive
        this.cells = [];

        // an array of cells that are only alive. We render this this so that we don't waste time looping through empty array elements during render.
        this.cells_alive = [];

        // records cells over time: dimension. i-th element contains the i-th frame of cells
        this.system = [];
        this.system_alive = [];
    }

  // count a single cell's neighbours
  count_neighbours(xPos, yPos, cell_snapshot)
  {
      var n_neighbours = 0;
      for (let a = 0; a < this.neighborhood.length; a++)

      {
          for (let b = 0; b < this.neighborhood[0].length; b++)
          {
              // check if neighborhood item is true, else skip
              if (this.neighborhood[a][b] === 1)
              {
                  // get distance from center of neighborhood to current cell to check in neighborhood
                  var xDist = b - Math.floor(this.neighborhood.length/2);
                  var yDist = a - Math.floor(this.neighborhood[0].length/2);

                  // access cell xDist,yDist away from the center of the cell with global coordinates xPos, yPos
                  // check if within bounds
                  if (!this.config['Wrap_Edges'])
                  {
                      if (xPos+xDist >= 0 && xPos+xDist < this.config['Width'] && yPos+yDist >= 0 && yPos+yDist < this.config['Height'])
                      {
                          // if this cell is alive, update neighbour count
                          if (cell_snapshot[xPos+xDist][yPos+yDist].state === this.config['Max_State'])
                          {
                              n_neighbours = n_neighbours + 1
                          }
                      }
                  }
                  else
                  {
                      var wrap_x = xPos+xDist;
                      var wrap_y = yPos+yDist;
                      if (wrap_x === -1)
                      {
                          wrap_x = this.config['Width']-1
                      }
                      else if (wrap_x > this.config['Width']-1)
                      {
                          wrap_x = 0
                      }
                      if (wrap_y === -1)
                      {
                          wrap_y = this.config['Height'] - 1
                      }
                      else if (wrap_y > this.config['Height']-1)
                      {
                          wrap_y = 0
                      }
                      // console.log(wrap_y, wrap_x)
                      if (cell_snapshot[wrap_x][wrap_y].state === this.config['Max_State'])
                      {
                          n_neighbours = n_neighbours + 1
                      }
                  }

              }

          }
      }
      return n_neighbours;
  }

  init(use_random_probability = null)
  {
      // array data
      this.cells = [] 
      this.cells_alive = []
      this.system_alive = []
      this.system = []
      for (let x = 0; x < this.config['Width']; ++x)
      {
          this.cells[x] = [];
          for (let y = 0; y < this.config['Height']; ++y)
          {
              // create cell object at (x,y)
              this.cells[x][y] = [];
              // cells[x][y] = new Cell(xPos = x, yPos = y, state = config['Max_State'], rect = );
              if (use_random_probability === null)
              {
                  this.cells[x][y] = new Cell(x, y, 0);
              }
              else
              {
                  this.cells[x][y] = new Cell(x, y, Math.random() > use_random_probability ? 0 : this.config["Max_State"]);
                  if (this.cells[x][y].state > 0)
                  {
                    this.cells_alive.push(this.cells[x][y])
                  }
              }
          }
      }
  }

  // Update system n times (default 1)
  iterate(n=1)
  {
    for (var z = 0; z < n; z++)
    {
        var myCells = this.cells
        // create a copy of the system
        // this is necessary because looping through and updating the system will cause 
        // later cells to be updated based on the *new* cells, which is not what we want
        const cells_read_only = JSON.parse(JSON.stringify(myCells))
        // const cells_read_only = Object.assign({}, myCells)
        var cells_updated = myCells;
        this.cells_alive = [];
        for (let x = 0; x < this.config['Width']; ++x)
        {
            for (let y = 0; y < this.config['Height']; ++y)
            {
                // Count neighbours
                // pass in a snapshot of the cell system
                var n_neighbours = this.count_neighbours(x,y, cells_read_only);
                // For dead  (empty) cells
                // Create a new cell at this location if it is dead and contains n_neighbours in rule

                if (this.config['Birth_Rule'].includes(n_neighbours) && cells_read_only[x][y].state === 0)
                {
                    cells_updated[x][y].state = this.config['Max_State'];
                    this.cells_alive.push(cells_updated[x][y])
                }

                // Else check alive cells
                // Keep cell alive if cell contains this many neighbours
                else if (this.config['Alive_Rule'].includes(n_neighbours) && cells_read_only[x][y].state === this.config['Max_State'])
                {
                    cells_updated[x][y].state = this.config[ 'Max_State'];
                    this.cells_alive.push(cells_updated[x][y])
                }
                // Else, cell loses 1 state (state--) or is dead (state=0)
                else
                {
                    cells_updated[x][y].state = Math.max(0, cells_read_only[x][y].state-1)
                    if (cells_updated[x][y].state > 0)
                    {
                      this.cells_alive.push(cells_updated[x][y])
                    }
                }
            }
        }
        // update cells
        this.cells = cells_updated;
        this.system.push(cells_updated);
        this.system_alive.push(this.cells_alive);
    }

  }

}

// A cell object is simply a square on a grid with a state
class Cell
{
    // specify x,y position, initial state
    constructor(xPos, yPos, state)
    {
        this.x = xPos;
        this.y = yPos;
        this.state = state;
        // this.rect = rect;
    }

    setState(number)
    {
        this.state = number;
    }
}

class Square
{
  // square contains color values and its type - "body" or "outline"
  // color is a hex string
  constructor(color, type) 
  {
      this.color = color;
      this.type = type;
  }

}
class Sprite
{
  // pass in a Cellular_Automata object to the sprite which we use to generate the full sprite
  // symmetry refers to the axis of symmetry requested when we flip. Valid values: "none", "vertical", "horizontal", "left diagonal", "right diagonal"
  constructor(cellular_automata, symmetry)
  {
      this.cellular_automata = cellular_automata;
      this.symmetry = symmetry;

      // set body color
      this.color_body = "#" + Math.floor(Math.random()*16777215).toString(16);
      this.color_edge = "#000000";
      if (symmetry === "vertical")
      {
        this.SpriteWidth = this.cellular_automata.config['Width'] * 2 + 2 ;
        this.SpriteHeight = this.cellular_automata.config['Height'] + 2;
      }
      else if (symmetry === "horizontal")
      {
        this.SpriteWidth = this.cellular_automata.config['Width'] + 2;
        this.SpriteHeight = this.cellular_automata.config['Height'] * 2 + 2;
      }
      else if (symmetry === "center")
      {
        this.SpriteWidth = this.cellular_automata.config['Width'] * 2 + 2;
        this.SpriteHeight = this.cellular_automata.config['Height'] * 2 + 2;
      }
      else
      {
        this.SpriteWidth = this.cellular_automata.config['Width'] + 2;
        this.SpriteHeight = this.cellular_automata.config['Height'] + 2;
      }
      this.graphics = Array(this.SpriteWidth).fill( new Square("#FFFFFF", "empty") )
      .map(x => Array(this.SpriteHeight).fill( new Square("#FFFFFF", "empty") )); // create an empty graphics array to fill with Square objects

  }

  // count surroundings at x,y (left,right,bottom,top,topright,topleft,bottomleft,bottomright)
  // needed to fill outline
  count_neighbours(xPos,yPos, useNeighborhood = null)
  {
    var n_neighbours = 0;
    var neighborhood;
    // default neighborhood is moore
    if (useNeighborhood === null)
    {
      neighborhood = [
      [1,1,1],
      [1,0,1],
      [1,1,1]]
    }
    else if (useNeighborhood === 'von_neumann')
    {
      neighborhood = [
      [0,1,0],
      [1,0,1],
      [0,1,0]]
    }

    for (let a = 0; a < neighborhood.length; a++)
    {
        for (let b = 0; b < neighborhood[0].length; b++)
        {
            // check if neighborhood item is true, else skip
            if (neighborhood[a][b] === 1)
            {
                // get distance from center of neighborhood to current cell to check in neighborhood
                var xDist = b - Math.floor(neighborhood.length/2);
                var yDist = a - Math.floor(neighborhood.length/2);

                // access cell xDist,yDist away from the center of the cell with global coordinates xPos, yPos
                // check if within bounds
                // console.log(xPos+xDist, yPos+yDist, this.graphics)
                if (xPos+xDist >= 0 && xPos+xDist < this.SpriteWidth && yPos+yDist >= 0 && yPos+yDist < this.SpriteHeight)
                {
                    // if this cell is alive, update neighbour count
                    if (this.graphics[xPos+xDist][yPos+yDist].type === "body")
                    {
                        n_neighbours = n_neighbours + 1
                    }
                }
            }
        }
      }
      return n_neighbours;
  }
  // complete the sprite
  generate_sprite()
  {
    // sprite has width+2 and height+2 to account for borders
    // [\ \ \ \]
    // [\ _ _ \]
    // [\ _ _ \]
    // [\ \ \ \]

    // loop through cells
  


    if (this.symmetry == "vertical")
    {
      var limX = this.cellular_automata.config['Width']*2;
      var limY = this.cellular_automata.config['Height'];
    }
    else if (this.symmetry == "horizontal")
    {
      var limX = this.cellular_automata.config['Width'];
      var limY = this.cellular_automata.config['Height']*2;

    }
    else if (this.symmetry == "center")
    {
      var limX = this.cellular_automata.config['Width']*2;
      var limY = this.cellular_automata.config['Height']*2;
    }

    // initialize big array
    this.graphics = [];
    for (var a = 0; a < limX; a++)
    {
      this.graphics[a] = []
      for (var b = 0; b < limY; b++)
      {
        this.graphics[a][b] = new Square("#ffffff", "empty")
      }
    }
    
    // copy the object
    for (var x = 0; x < this.cellular_automata.config['Width']; x++)
    {
      for (var y = 0; y < this.cellular_automata.config['Height']; y++)
      {
        if (this.cellular_automata.cells[x][y].state > 0)
        {
          // fill square at location
          this.graphics[x][y] = new Square(this.color_body, "body")

          // apply symmetry
          if (this.symmetry === "vertical")
          {
            this.graphics[limX-1-x][y] = new Square(this.color_body, "body")
          }
          else if (this.symmetry === "horizontal")
          {
            this.graphics[x][limY-1-y] = new Square(this.color_body, "body")
          }
          else if (this.symmetry === "center")
          {
            this.graphics[limX-1-x][y] = new Square(this.color_body, "body")
            this.graphics[limX-1-x][limY-1-y] = new Square(this.color_body, "body")
            this.graphics[x][limY-1-y] = new Square(this.color_body, "body")
          }
        }

      }
      // top and bottom
      this.graphics[x].unshift(new Square("#ffffff", "empty"))
      this.graphics[x].push(new Square("#ffffff", "empty"))

      if (this.symmetry === "vertical")
      {
        this.graphics[limX-1-x].unshift(new Square("#ffffff", "empty"))
        this.graphics[limX-1-x].push(new Square("#ffffff", "empty"))
      }

      // add padding

    }
    // add side padding
    this.graphics.unshift( new Array(limY+2).fill( new Square("#FFFFFF", "empty") ))
    this.graphics.push( new Array(limY+2).fill( new Square("#FFFFFF", "empty") ))

    // fill edges

    // select 0 or 1 neighbors as the criterion for placing an edge
    // var random_edge = getRandomInt(1,2)
    var random_edge;
    if (Math.random() > 0.25)
    {
      random_edge = 1
    }
    else
    {
      random_edge = 1
    }
    

    for (var x = 0; x < this.graphics.length; x++)
    {
      for (var y = 0; y < this.graphics[0].length; y++)
      {
        if (this.count_neighbours(x,y, "von_neumann") >= random_edge && this.graphics[x][y].type === "empty")
        {
          this.graphics[x][y] = new Square(this.color_edge, "edge")
        }
      }
    }
  }


}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



export default function getSprite(){


  var config = {
    'Name':"Conway's Game of Life",
    'Type':moore_simple_neighborhood,
    'Birth_Rule':[0,1],
    'Alive_Rule':[2,3],
    'Max_State':1,
    'Width':4,
    'Height':8,
    'Wrap_Edges':false
  };
  
  // 3x3 moore
  var moore_simple_neighborhood = [
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ];
  var von_neumann_simple_neighborhood = [
    [0,1,0],
    [1,0,1],
    [0,1,0]
  ];
  
  var alt_neighborhood = [
    [1,0,1],
    [0,0,0],
    [1,0,1]
  ];
  
  var neighborhood = von_neumann_simple_neighborhood;
  
  var alive_color_code = "#2E8B9F"
  var edge_color_code = "#000000"
  

  var random_neighborhood = Math.random()
  if (random_neighborhood > 0.75)
  {
    neighborhood = von_neumann_simple_neighborhood;
  }
  else
  {
    neighborhood = moore_simple_neighborhood;
  }
  // if (random_neighborhood<0.3)
  // {
  //   neighborhood = von_neumann_simple_neighborhood;
  // }
  // else if (random_neighborhood < 0.6)
  // {
  //   neighborhood = moore_simple_neighborhood;
  // }
  // else
  // {
  //   neighborhood = alt_neighborhood;
  // }
  var System = new Cellular_Automata(config, neighborhood);
  // System.init(0.05);
  System.init(Math.max(0.1,Math.random()));
  // System.iterate(Math.ceil(Math.random()*3));
  // System.iterate(getRandomInt(2,5));
  System.iterate(getRandomInt(1,4));
  var mySprite = new Sprite(System, "vertical")
  mySprite.generate_sprite();

  return mySprite
}


// var System = new Cellular_Automata(config, neighborhood);
// var Sprites = [];
// var Systems = [];


// p5.js old file

// function setup() {
//   createCanvas(WIDTH, HEIGHT);
//   frameRate(framerate);
// }

// function draw() {
//   Sprites = [];
//   Systems = [];
//   //https://gist.github.com/peterhellberg/3c5b30465a258f6b688a8f11955b12ba
//   for (var i = 0; i < 100; i++)
//   {
//     var random_neighborhood = Math.random()
//     if (random_neighborhood<0.3)
//     {
//       neighborhood = von_neumann_simple_neighborhood;
//     }
//     else if (random_neighborhood < 0.6)
//     {
//       neighborhood = moore_simple_neighborhood;
//     }
//     else
//     {
//       neighborhood = alt_neighborhood;
//     }
//     var System = new Cellular_Automata(config, neighborhood);
//     // System.init(0.05);
//     System.init(Math.random());
//     // System.iterate(Math.ceil(Math.random()*3));
//     // System.iterate(getRandomInt(2,5));
//     System.iterate(getRandomInt(0,4));
//     mySprite = new Sprite(System, "vertical")
//     mySprite.generate_sprite();
//     Systems.push(System);
//     Sprites.push(mySprite);
//   }
//   background(220);
//   noStroke()
//   var c = 0;
//   var z = 0;



//   if (SHOW_GRID)
//   {
//     // loop through only alive cells to speedup rendering
//     for (let mySprite of Sprites)
//     {
//       for (var x = 0; x < mySprite.graphics.length; x++)
//       {
//         for (var y = 0; y < mySprite.graphics[0].length; y++)
//         {
//           // console.log(x,y)
//           var squareColor = mySprite.graphics[x][y].color;
  
//           fill(squareColor);
//           stroke(squareColor)

//           rect(c*mySprite.SpriteWidth*GRIDSIZE/3 + x*GRIDSIZE/4+20,z*mySprite.SpriteHeight*GRIDSIZE/3 + y*GRIDSIZE/4+20,GRIDSIZE/4,GRIDSIZE/4)
//         }
//       }
//       if (c*mySprite.SpriteWidth*GRIDSIZE/3 + x*GRIDSIZE/4+20 > WIDTH-250)
//       {
//         c = 0;
//         z += 1;
//       }
//       else
//       {
//         c+=1;

//       }

//     }
//   }
//   else
//   {
//   for (var x = 0; x < Sprites[0].graphics.length; x++)
//   {
//     for (var y = 0; y < Sprites[0].graphics[0].length; y++)
//     {
//           var squareColor = mySprite.graphics[x][y].color;
          
//           // use transparency
//           if (mySprite.graphics[x][y].type !== "empty")
//           {
//             fill(squareColor);
//           }
//           else
//           {
//             noFill()
//           }

//           // nostroke(squareColor)
//           rect(x*GRIDSIZE,y*GRIDSIZE,GRIDSIZE,GRIDSIZE)

//     }

//   }
//   if (key === 's') {
//     saveCanvas('myCanvas', 'png');

//   }
//   console.log('done')
//   }
// }