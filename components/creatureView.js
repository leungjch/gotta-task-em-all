
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
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style>
      body {
        margin-top: 2%;
      }
      canvas {
        border-radius:20%;
        width: 100%;
        height: 100%;

        // margin: auto;
        // display: block;
      }
      p {
        font-size:100px;
      }

      </style>

      </head>
      <body>
        <canvas width="${100}" id="canvas" height="${100}"/>
      </body>


    </html>
  `;
  const jsCode = `

  /* START OF SPRITE RENDERING FILE */
  
  var SpriteWidth = ${creature.sprite.spriteWidth};
  var SpriteHeight = ${creature.sprite.spriteHeight};
  var SpriteSheet = ${JSON.stringify(creature.sprite.spriteSheet)}
  var Background = ${JSON.stringify(creature.sprite.backgroundCol)}
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  
  canvas.width = 100
  canvas.height = 100
  
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
  
  // // Shade edges

  // if (vals[k][l][1] === Background[0] && vals[k][l][1] === Background[1] && vals[k][l][1] === Background[2] &&
  //     k+1 > 0 && k+1 < SpriteWidth && l > 0)
  // if (vals[k][l][1] !== Background[0] && (k+1)%SpriteWidth !== 0 && l < SpriteHeight && vals[k+1][l][1] === 255)
  // {
  //   vals[k+1][l][0] = 0
  //   vals[k+1][l][1] = 0
  //   vals[k+1][l][2] = 0
    
  // }
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
  ctx.imageSmoothingEnabled = false

  ctx.drawImage(canvas, 0,0,Width/SpriteWidth*canvas.width, Height/SpriteHeight*canvas.height)
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
  },60)
  `; 
  return (
        <WebView source={{ html: html }}
                scrollEnabled={false}
                injectedJavaScript={jsCode}
                style={{ backgroundColor: 'transparent', width: 100, height:100}}
                originWhitelist={['*']}
                javaScriptEnabledAndroid={ true }
                />
  );
}
