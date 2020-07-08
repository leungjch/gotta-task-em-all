import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Dimensions } from "react-native";

import { globalStyles } from '../styles/global'
import getSprite from '../scripts/sketch'
import Card from '../shared/card';

import CreatureView from '../components/creatureView'
import { BaseRouter } from '@react-navigation/native';

export default function TodoDetails({ navigation, item }){
    // const { text } = route.params
    // const { creature } = route.params
    return(
        <View style={{...globalStyles.container, ...styles.container}}>
            <Card>
                <Text>Hewwp</Text>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a6dcef',
    }
})
  