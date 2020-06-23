import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Header from '../components/header'
import { globalStyles } from '../styles/global'


export default function TodoDetails({route, navigation}){
    const { text } = route.params
    // console.log("text is", itemId)
    return(
        <Header title={text}/>
        // <Text style= {globalStyles.titleText}>{text}</Text>
    )
}