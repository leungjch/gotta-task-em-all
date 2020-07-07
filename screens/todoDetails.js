import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Dimensions } from "react-native";


import Header from '../components/header'
import TodoItem from '../components/todoItem'
import { globalStyles } from '../styles/global'
import getSprite from '../scripts/sketch'

import CreatureView from '../components/creatureView'

export default function TodoDetails({route, navigation}){
    const { text } = route.params
    const { creature } = route.params
    return(
        <View style={{flex: 1, flexDirection:'column'}}>
            <Header title={text}/>
            <CreatureView creature = {creature} />
        </View>

        
    )
}


const styles = StyleSheet.create({

})
  