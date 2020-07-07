import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TodoItem({ item, removeHandler, completeHandler, navigateDetailHandler, navigation }){
    return (
        <TouchableOpacity onPress={() => {navigation.navigate("TodoDetails", item)}}>
            <View style={styles.item}>
                <Icon name={item.isComplete === true ? "check-box" : "check-box-outline-blank"} color="#3f72af" size = {18} onPress = {() => completeHandler(item.key)} />
                <Text style={styles.itemText}>{item.text}</Text>
                <Icon name="remove" size = {18} onPress={() => removeHandler(item.key)} style={styles.itemRemove} />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item: {
        // backgroundColor: "#caf0f8",
        backgroundColor: "#c0fdff",
        padding: 16,
        marginTop: 8,
        borderColor: "#dbe2ef",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        flexDirection: 'row',

    },
    itemText: {
        marginLeft: 10,
    },
    itemRemove: {
        marginLeft: 'auto'
    }
})

