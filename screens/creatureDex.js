import Header from '../components/header'


export default function TodoDetails({route, navigation}){
    const { text } = route.params
    const { creature } = route.params

    // console.log("text is", itemId)

    const handleCanvas = (canvas) => {
        if (canvas !== null){

        var mySprite = getSprite();


        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let scale = 1

        ctx.scale(scale, scale)

        var canvas_gridsize = 8
        canvas.width = creature.sprite.graphics.length*canvas_gridsize;
        canvas.height = creature.sprite.graphics[0].length*canvas_gridsize;

        for (var i = 0; i < creature.sprite.SpriteWidth; i++)
        {
            for (var j = 0; j < creature.sprite.SpriteHeight; j++)
            {
                if (creature.sprite.graphics[i][j].type !== "empty")
                {
                    ctx.fillStyle = creature.sprite.graphics[i][j].color;
                    // ctx.strokeStyle = creature.sprite.graphics[i][j].color;
                    ctx.fillRect(i*canvas_gridsize, j*canvas_gridsize, canvas_gridsize, canvas_gridsize);
                }
            }
        }
      }
    }
    
    return(
        <View>
        <Header title={Your Creatures}/>
        <View style={styles.canvas}>
            <Canvas ref={handleCanvas} style={styles.canvas2} />
        </View>

        {/* <TodoItem /> */}
        </View>

        
        // <Text style= {globalStyles.titleText}>{text}</Text>
    )
}


const styles = StyleSheet.create({
    canvas:{
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1
    
    },
    canvas2:{
        // borderWidth: 2,
        backgroundColor: "#fddfc5",
        borderRadius: 5,


        alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1
    }
})
  