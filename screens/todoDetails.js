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


    const markCompleteHandler = () => {

        // Gives warning if we try to pass function as params
        // if(item['isComplete'] == false) {
        //   removeHandler(item.key);
        //   addCompleteItem(item);
        // } 
        // else { //if user changes status form complete to not complete, item goes to top of list
        //   removeHandler(item.key)
        //   addItem(item)
        // }
        navigation.navigate("Tasks")

      };

    return(
        <View style={{...globalStyles.container, ...styles.container}}>
            <Card>
                <Text style={styles.itemText}>{item['task']} </Text>
                {item['note'] !== '' ? 
                    <Text style={styles.note}>{item['note']}</Text>
                : null }
            </Card>



            


            <FlatList
            data={item.subItems}
            renderItem = {({item}) => 
                <View style={styles.subItem}>
                    <Text style={styles.subItemText}>{item.task}</Text>
                </View>
            
            }
            />

            <Button color='#3f72af' title="Mark Complete" onPress={markCompleteHandler}/> 
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
  