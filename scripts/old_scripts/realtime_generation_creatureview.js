const jsCode = `
/* IMPORTED Perlin.js CODE STARTS HERE 
Credits: josephg's noisejs (https://github.com/josephg/noisejs/blob/master/perlin.js)
* A speed-improved perlin and simplex noise algorithms for 2D.
*
* Based on example code by Stefan Gustavson (stegu@itn.liu.se).
* Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
* Better rank ordering method by Stefan Gustavson in 2012.
* Converted to Javascript by Joseph Gentle.
*
* Version 2012-03-09
*
* This code was placed in the public domain by its original author,
* Stefan Gustavson. You may use it as you see fit, but
* attribution is appreciated.
*
*/

(function(global){
var module = global.noise = {};

function Grad(x, y, z) {
this.x = x; this.y = y; this.z = z;
}

Grad.prototype.dot2 = function(x, y) {
return this.x*x + this.y*y;
};

Grad.prototype.dot3 = function(x, y, z) {
return this.x*x + this.y*y + this.z*z;
};

var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
          new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
          new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

var p = [151,160,137,91,90,15,
131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
// To remove the need for index wrapping, double the permutation table length
var perm = new Array(512);
var gradP = new Array(512);

// This isn't a very good seeding function, but it works ok. It supports 2^16
// different seed values. Write something better if you need more seeds.
module.seed = function(seed) {
if(seed > 0 && seed < 1) {
  // Scale the seed out
  seed *= 65536;
}

seed = Math.floor(seed);
if(seed < 256) {
  seed |= seed << 8;
}

for(var i = 0; i < 256; i++) {
  var v;
  if (i & 1) {
    v = p[i] ^ (seed & 255);
  } else {
    v = p[i] ^ ((seed>>8) & 255);
  }

  perm[i] = perm[i + 256] = v;
  gradP[i] = gradP[i + 256] = grad3[v % 12];
}
};

module.seed(0);

/*
for(var i=0; i<256; i++) {
perm[i] = perm[i + 256] = p[i];
gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
}*/

// Skewing and unskewing factors for 2, 3, and 4 dimensions
var F2 = 0.5*(Math.sqrt(3)-1);
var G2 = (3-Math.sqrt(3))/6;

var F3 = 1/3;
var G3 = 1/6;

// 2D simplex noise
module.simplex2 = function(xin, yin) {
var n0, n1, n2; // Noise contributions from the three corners
// Skew the input space to determine which simplex cell we're in
var s = (xin+yin)*F2; // Hairy factor for 2D
var i = Math.floor(xin+s);
var j = Math.floor(yin+s);
var t = (i+j)*G2;
var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
var y0 = yin-j+t;
// For the 2D case, the simplex shape is an equilateral triangle.
// Determine which simplex we are in.
var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
  i1=1; j1=0;
} else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
  i1=0; j1=1;
}
// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
// c = (3-sqrt(3))/6
var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
var y1 = y0 - j1 + G2;
var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
var y2 = y0 - 1 + 2 * G2;
// Work out the hashed gradient indices of the three simplex corners
i &= 255;
j &= 255;
var gi0 = gradP[i+perm[j]];
var gi1 = gradP[i+i1+perm[j+j1]];
var gi2 = gradP[i+1+perm[j+1]];
// Calculate the contribution from the three corners
var t0 = 0.5 - x0*x0-y0*y0;
if(t0<0) {
  n0 = 0;
} else {
  t0 *= t0;
  n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
}
var t1 = 0.5 - x1*x1-y1*y1;
if(t1<0) {
  n1 = 0;
} else {
  t1 *= t1;
  n1 = t1 * t1 * gi1.dot2(x1, y1);
}
var t2 = 0.5 - x2*x2-y2*y2;
if(t2<0) {
  n2 = 0;
} else {
  t2 *= t2;
  n2 = t2 * t2 * gi2.dot2(x2, y2);
}
// Add contributions from each corner to get the final noise value.
// The result is scaled to return values in the interval [-1,1].
return 70 * (n0 + n1 + n2);
};

// 3D simplex noise
module.simplex3 = function(xin, yin, zin) {
var n0, n1, n2, n3; // Noise contributions from the four corners

// Skew the input space to determine which simplex cell we're in
var s = (xin+yin+zin)*F3; // Hairy factor for 2D
var i = Math.floor(xin+s);
var j = Math.floor(yin+s);
var k = Math.floor(zin+s);

var t = (i+j+k)*G3;
var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
var y0 = yin-j+t;
var z0 = zin-k+t;

// For the 3D case, the simplex shape is a slightly irregular tetrahedron.
// Determine which simplex we are in.
var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
if(x0 >= y0) {
  if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
  else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
  else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
} else {
  if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
  else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
  else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
}
// A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
// a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
// a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
// c = 1/6.
var x1 = x0 - i1 + G3; // Offsets for second corner
var y1 = y0 - j1 + G3;
var z1 = z0 - k1 + G3;

var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
var y2 = y0 - j2 + 2 * G3;
var z2 = z0 - k2 + 2 * G3;

var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
var y3 = y0 - 1 + 3 * G3;
var z3 = z0 - 1 + 3 * G3;

// Work out the hashed gradient indices of the four simplex corners
i &= 255;
j &= 255;
k &= 255;
var gi0 = gradP[i+   perm[j+   perm[k   ]]];
var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

// Calculate the contribution from the four corners
var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
if(t0<0) {
  n0 = 0;
} else {
  t0 *= t0;
  n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
}
var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
if(t1<0) {
  n1 = 0;
} else {
  t1 *= t1;
  n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
}
var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
if(t2<0) {
  n2 = 0;
} else {
  t2 *= t2;
  n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
}
var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
if(t3<0) {
  n3 = 0;
} else {
  t3 *= t3;
  n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
}
// Add contributions from each corner to get the final noise value.
// The result is scaled to return values in the interval [-1,1].
return 32 * (n0 + n1 + n2 + n3);

};

// ##### Perlin noise stuff

function fade(t) {
return t*t*t*(t*(t*6-15)+10);
}

function lerp(a, b, t) {
return (1-t)*a + t*b;
}

// 2D Perlin Noise
module.perlin2 = function(x, y) {
// Find unit grid cell containing point
var X = Math.floor(x), Y = Math.floor(y);
// Get relative xy coordinates of point within that cell
x = x - X; y = y - Y;
// Wrap the integer cells at 255 (smaller integer period can be introduced here)
X = X & 255; Y = Y & 255;

// Calculate noise contributions from each of the four corners
var n00 = gradP[X+perm[Y]].dot2(x, y);
var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

// Compute the fade curve value for x
var u = fade(x);

// Interpolate the four results
return lerp(
    lerp(n00, n10, u),
    lerp(n01, n11, u),
  fade(y));
};

// 3D Perlin Noise
module.perlin3 = function(x, y, z) {
// Find unit grid cell containing point
var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
// Get relative xyz coordinates of point within that cell
x = x - X; y = y - Y; z = z - Z;
// Wrap the integer cells at 255 (smaller integer period can be introduced here)
X = X & 255; Y = Y & 255; Z = Z & 255;

// Calculate noise contributions from each of the eight corners
var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

// Compute the fade curve value for x, y, z
var u = fade(x);
var v = fade(y);
var w = fade(z);

// Interpolate
return lerp(
    lerp(
      lerp(n000, n100, u),
      lerp(n001, n101, u), w),
    lerp(
      lerp(n010, n110, u),
      lerp(n011, n111, u), w),
  v);
};

})(this);
/* END OF perlin.js FILE */
/* START OF SPRITE GENERATION FILE */

var SpriteWidth = 32;
var SpriteHeight = 32;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 900
canvas.height = 900

// Scale the canvas up to desired size
// ctx.scale(canvas.width/SpriteWidth,canvas.height/SpriteHeight);


var centerX = SpriteWidth/2;
var centerY = SpriteHeight/2;

var Width = canvas.width
var Height = canvas.height

noise.seed(Math.random());
var noiseScale = 0.03;
var t = 0;
var inc = 0;

// Get colors
// var nColors = Math.ceil(Math.random()*10)
var nColors = Math.ceil(5)

var colors = []
for (let i = 0; i < nColors; i++)
{
colors.push([255,255-50*i,255])
// colors.push(color(255, Math.random()*255, Math.random()*255))
}

setInterval(function(){
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 200, 75);
var imgdata = ctx.getImageData(0,0, SpriteWidth, SpriteHeight);
var imgdatalen = imgdata.data.length;

// Store noise values
vals = [];

// Iterate through Sprite and generate values
for (var j = 0; j < SpriteWidth/2; j++)
{
vals[j] = []
vals[SpriteWidth-1-j] = []
for (var i = 0; i < SpriteHeight; i++)
{
  val = (noise.perlin3(j*noiseScale,i*noiseScale, t)+1)/2;
  var distance = 1-Math.sqrt((j-centerX)**2+(i-centerY)**2)/Math.sqrt(centerX**2+centerY**2);
  var f = distance;
  var c = [255,255,255]
  if (val > f)
  {
    // c = Math.floor(Math.random()*255)
    c = [255,255,255]
  }
  else
  {
    // get color
    for (let p = 0; p < colors.length; p++)
    {
      if (val < p/colors.length)
      {

        c = colors[p]
        break
      }
    }

  }

  vals[j][i] = c
  vals[SpriteWidth-1-j][i] = c
}
}

var k = 0;
var l = 0;
// Insert image data
for(var i=0;i<imgdatalen/4;i++){  //iterate over every pixel in the canvas

// Shade right hand edge
if (vals[k][l][1] !== 255 && (k+1)%SpriteWidth !== 0 && l < SpriteHeight && vals[k+1][l][1] === 255)
{
  vals[k+1][l][0] = 255
  vals[k+1][l][1] = 255
  vals[k+1][l][2] = 0
  
}
imgdata.data[4*i] = Math.floor(vals[k][l][0]);    // RED (0-255)
imgdata.data[4*i+1] = Math.floor(vals[k][l][1]);    // GREEN (0-255)
imgdata.data[4*i+2] = Math.floor(vals[k][l][2]);    // BLUE (0-255)
imgdata.data[4*i+3] = 255;  // APLHA (0-255)

k+=1
if (k%SpriteWidth == 0)
{
  k = 0
  l += 1
}

}
ctx.putImageData(imgdata,0,0);

// Unexpected behaviour
ctx.drawImage(canvas, 0,0,Width/SpriteWidth*canvas.width, Height/SpriteHeight*canvas.height)
ctx.imageSmoothingEnabled = false
// ctx.drawImage(canvas, 0, 0)
// canvas.style['image-rendering']='pixelated'
// canvas.style['image-rendering']='crisp-edges'
var d = new Date();

// Animation
// sin oscillates the animation, division at the end controls animation speed
inc += 0.005
// t=Math.abs(Math.sin(inc)/1)+1
t = inc
},17)
`;



// testing
const jsCode = `
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 900
canvas.height = 900

var mySprite = ${creature.sprite};
// Scale the canvas up to desired size
// ctx.scale(canvas.width/SpriteWidth,canvas.height/SpriteHeight);

${console.log("hello")}
var centerX = mySprite.spriteWidth/2;
var centerY = mySprite.spriteHeight/2;

var Width = canvas.width
var Height = canvas.height


var t = 0;
var inc = 0;

var frame = 0;
setInterval(function(){
  var imgdata = ctx.getImageData(0,0, mySprite.spriteWidth, mySprite.spriteHeight);
  var imgdatalen = imgdata.data.length;
  ${console.log("hello")}

  // Retrieve noise values
  var vals = mySprite.spriteSheet[frame]

  var k = 0;
  var l = 0;
  // Insert image data
  for(var i=0;i<imgdatalen/4;i++){  //iterate over every pixel in the canvas

    // // Shade right hand edge
    // if (vals[k][l][1] !== 255 && (k+1)%SpriteWidth !== 0 && l < SpriteHeight && vals[k+1][l][1] === 255)
    // {
    //   vals[k+1][l][0] = 255
    //   vals[k+1][l][1] = 255
    //   vals[k+1][l][2] = 0
      
    // }
    imgdata.data[4*i] = Math.floor(vals[k][l][0]);    // RED (0-255)
    imgdata.data[4*i+1] = Math.floor(vals[k][l][1]);    // GREEN (0-255)
    imgdata.data[4*i+2] = Math.floor(vals[k][l][2]);    // BLUE (0-255)
    imgdata.data[4*i+3] = 255;  // APLHA (0-255)

    k+=1
    if (k%mySprite.spriteWidth == 0)
    {
      k = 0
      l += 1
    }
  }

  ctx.putImageData(imgdata,0,0);

  // Unexpected behaviour
  // ctx.drawImage(canvas, 0,0,Width/mySprite.spriteWidth*canvas.width, Height/mySprite.spriteHeight*canvas.height)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(canvas, 0, 0)
  // canvas.style['image-rendering']='pixelated'
  // canvas.style['image-rendering']='crisp-edges'
  // var d = new Date();



  frame += 1
  ${console.log(creature.sprite.spriteSheet.length)}
  if (frame > mySprite.spriteSheet.length)
  {
    frame = 0
  }

},17)
`;
