import React, {useState, useContext} from 'react';

import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, View, Text, StatusBar, FlatList, } from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

import CreatureView from '../components/creatureView'

import { CreaturesDispatchContext } from '../contexts/creature/creaturesContext';
import { CreaturesContext } from '../contexts/creature/creaturesContext'
import { ADD_CREATURE, REMOVE_CREATURE } from '../contexts/creature/creaturesActions';

export default function CreatureDex({route, navigation}){
    const creatures = useContext(CreaturesContext);
    const creaturesDispatch = useContext(CreaturesDispatchContext);
    return(
        <View style={{flex: 1}}>
            <FlatGrid
            itemDimension={110}
            spacing = {10}
            data = {creatures}
            renderItem = {({ item }) => (
                <View style = {styles.box}>
                <CreatureView creature = {item['creature']} />
                <Text style = {styles.creatureName}>{item['creature']['name']}</Text>

                </View>
            )}
            />
        </View>
        )
}

const styles = StyleSheet.create({
    canvas:{
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1
    },
    box:{
        backgroundColor: "#3f72af",
        borderRadius: 10,
    },
    creatureName:{
        color: "#FFFFFF",
        margin:10
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
  