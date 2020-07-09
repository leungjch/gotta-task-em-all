import React, {useState, useContext} from 'react';

import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, View, Text, StatusBar, FlatList, } from 'react-native';

import CreatureView from '../components/creatureView'

import { CreaturesDispatchContext } from '../contexts/creature/creaturesContext';
import { CreaturesContext } from '../contexts/creature/creaturesContext'
import { ADD_CREATURE, REMOVE_CREATURE } from '../contexts/creature/creaturesActions';


export default function CreatureDex({route, navigation}){
    const creatures = useContext(CreaturesContext);
    const creaturesDispatch = useContext(CreaturesDispatchContext);
    console.log(creatures)
    return(
            // {/* <FlatList
            // data={creatures}
            // renderItem={({ item }) => (
            // //   <TouchableOpacity onPress={() => {navigation.navigate("Task Details", {item: item})}}>
            //     <View style={{flex: 1, flexDirection:'column'}}>
            //         <CreatureView creature = {item['creature']} />
            //     </View>
            // // </TouchableOpacity>
            // )}
            // /> */}

        <View style={{flex: 1}}>
                {/* <CreatureView creature = {creatures[0]['creature']} />
                <CreatureView creature = {creatures[1]['creature']} /> */}
            <FlatList
            data={creatures}
            style={{flex: 1}}
            renderItem = {({ item }) => (
                <CreatureView creature = {item['creature']} />
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
    canvas2:{
        // borderWidth: 2,
        backgroundColor: "#fddfc5",
        borderRadius: 5,


        alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1
    }
})
  