
    // Old sprite generation method
    // Turns out, using ctx.fillrect is very slow. Much faster to use direct pixel manipulation.
    
    // const handleCanvas = (canvas) => {
    //     if (canvas !== null){

    //     var mySprite = getSprite();

    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     let scale = 1

    //     ctx.scale(scale, scale)

    //     var canvas_gridsize = 8
    //     canvas.width = creature.sprite.graphics.length*canvas_gridsize;
    //     canvas.height = creature.sprite.graphics[0].length*canvas_gridsize;

    //     for (var i = 0; i < creature.sprite.SpriteWidth; i++)
    //     {
    //         for (var j = 0; j < creature.sprite.SpriteHeight; j++)
    //         {
    //             if (creature.sprite.graphics[i][j].type !== "empty")
    //             {
    //                 ctx.fillStyle = creature.sprite.graphics[i][j].color;
    //                 // ctx.strokeStyle = creature.sprite.graphics[i][j].color;
    //                 ctx.fillRect(i*canvas_gridsize, j*canvas_gridsize, canvas_gridsize, canvas_gridsize);
    //             }
    //         }
    //     }
    //   }
    // }
    