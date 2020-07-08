import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
//import DatePicker from 'react-datepicker';

import { Formik } from 'formik';
import * as yup from 'yup';
/*
const DatePickerField = ({ name, value, onCange }) => {
    return (
        <DatePicker
            selected={(value && new Date(value) || null)}
            onChange={val => {
                onChange(name, val);
            }}
        />
    );
};
*/

const itemSchema = yup.object({
    task: yup.string().required(),
    note: yup.string(),
    priority: yup.string().test('num', 'Must be a number between 1 and 3', (val) => {return ((parseInt(val) < 4 && parseInt(val) > 0) || val == null);}),
})

export default function AddTodo({ submitHandler }){
    return (
        <View>
            <Text style={styles.instructionText}>Fill in the input fields. </Text>
            <Text style={styles.instructionText2} >* means the field is required</Text>
           <Formik
                initialValues={{task: '', note: '', priority: ''}} //add due-date and repetition later
                validationSchema={itemSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    submitHandler(values);
                }}
           >
               {(props) => (
                   <View>
                       <TextInput  
                            style={globalStyles.input}
                            placeholder='* Task...'
                            onChangeText={props.handleChange('task')}
                            value={props.values.task}
                            onBlur={props.handleBlur('task')}
                        />
                        <Text style={globalStyles.errorText}>
                            {props.touched.task && props.errors.task}
                        </Text>

                        <TextInput  
                            style={globalStyles.input}
                            placeholder='Notes...'
                            miltiline minHeight={60}
                            onChangeText={props.handleChange('note')}
                            value={props.values.note}
                            onBlur={props.handleBlur('note')}
                        />
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Priority (1-3)'
                            onChangeText={props.handleChange('priority')}
                            value={props.values.priority}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('priority')}
                        />
                        <Text style={globalStyles.errorText}>
                            {props.touched.priority && props.errors.priority}
                        </Text>

                        <Button title="Create Task" onPress={props.handleSubmit} />

                   </View>
               )}
           </Formik>
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
    },
    instructionText: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    instructionText2: {
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
})