import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TodoItem({ item, pressHandler }){
    return (
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            
            <Text style = {styles.item}><Icon name="check-box" color="#000000" /> {item.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    }
})