
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

export default function CreatureView({creature}) {
    const html = `
    <html>
      <head>
      <style>
      body {
        margin-top: 2%;
      }
      canvas {
        border-radius:25%;
        width: 25%;
        margin: auto;
        display: block;
      }
      p {
        font-size:100px;
      }

      </style>

      </head>
      <body>
        <canvas width="${900}" id="canvas" height="${900}"/>
      </body>


    </html>
  `;
  const jsCode = `

  /* START OF SPRITE RENDERING FILE */
  
  var SpriteWidth = ${creature.sprite.spriteWidth};
  var SpriteHeight = ${creature.sprite.spriteHeight};

  var SpriteSheet = ${JSON.stringify(creature.sprite.spriteSheet)}
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  
  canvas.width = 900
  canvas.height = 900
  
  var centerX = SpriteWidth/2;
  var centerY = SpriteHeight/2;
  
  var Width = canvas.width
  var Height = canvas.height
  
  var t = 0;
  var inc = 0;
  
  var frame = 0
  
  setInterval(function(){

  var imgdata = ctx.getImageData(0,0, SpriteWidth, SpriteHeight);
  var imgdatalen = imgdata.data.length;
  
  // Store noise values
  var vals = SpriteSheet[frame]
  
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
  var d = new Date();
  
  // Animation
  // sin oscillates the animation, division at the end controls animation speed
  inc += 0.005
  // t=Math.abs(Math.sin(inc)/1)+1
  t = inc
  frame += 1
  if (frame > SpriteSheet.length-1)
  {
    frame = 0;
  }
  },17)
  `; 
  return (
        <WebView source={{ html }}
                injectedJavaScript={jsCode}
                style={{ backgroundColor: 'transparent'}}
                originWhitelist={['*']}
                javaScriptEnabledAndroid={ true }

                />
  );
}
