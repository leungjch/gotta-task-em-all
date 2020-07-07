import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Keyboard } from 'react-native';

export default function AddTodo({ submitHandler }){
    const [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    }


    return (
        <View> 
            <TextInput
                style ={styles.input}
                placeholder='new todo...'
                value={text}
                onChangeText={changeHandler}/>
            <Button onPress={() => {
                submitHandler(text);
                setText('');
                Keyboard.dismiss();
            }}
            title='add todo' 
            backgrolor='#3f72af' 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})