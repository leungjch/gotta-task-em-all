import Header from '../components/header'


export default function CreatureDex({route, navigation}){
    const { todos } = route.params
    // console.log("text is", itemId)
    
    return(
        <View>
        <Header title={Your Creatures}/>
        <View style={styles.canvas}>
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
  