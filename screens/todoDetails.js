import React from 'react';
import { StyleSheet, Button, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Dimensions } from "react-native";

import { globalStyles } from '../styles/global'
import getSprite from '../scripts/sketch'
import Card from '../shared/card';

import CreatureView from '../components/creatureView'
import { BaseRouter } from '@react-navigation/native';

export default function TodoDetails({ route, navigation }){
    const { item } = route.params

    const [completed, setCompleted] = React.useState({item: item, key: item['key']});

    // From https://reactnavigation.org/docs/params
    // "Passing params to a previous screen" section
    const markCompleteHandler = () => {
        navigation.navigate("Tasks", {completed: completed})
      };

    return(
        <View style={{...globalStyles.container, ...styles.container}}>
            <Card>
                <Text style={[styles.itemText, item.isComplete ? styles.itemTextComplete : styles.itemTextIncomplete]}>{item['task']} </Text>
                {item['note'] !== '' ? 
                    <Text style={styles.note}>{item['note']}</Text>
                : null }
            </Card>            

            <FlatList
            data={item.subTasks}
            renderItem = {({item}) => 
                <View style={styles.subItem}>
                    <Text style={styles.subItemText}>{item.task}</Text>
                </View>
            }
            />

            <Button color='#3f72af' title={item.isComplete ? "Mark Incomplete" : "Mark Complete"} onPress={markCompleteHandler}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a6dcef',
    },
    itemText:{
        fontWeight: 'normal',
        fontSize: 18
    },
    itemTextComplete: {
        textDecorationLine : 'line-through', 
        color: '#bdc3c7'
      },
    itemTextIncomplete: {
    textDecorationLine : 'none',
    color: '#34495e'
    },
    noteText:{
        fontSize: 16
    },
    subItemText:{
        fontWeight: "200", // Light text weight, need to install custom font
        fontSize: 14,
    },
    subItem:{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 6,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 20,
        marginVertical: 3,
        flexDirection: 'row',
    }
})
  