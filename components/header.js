import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}> Task Catcher </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingTop: 20,
        backgroundColor: '#0096c7'
    },
    title: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
    }
});