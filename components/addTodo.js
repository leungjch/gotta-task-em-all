import * as React from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableHighlight, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { globalStyles } from '../styles/global';
import DatePicker from 'react-datepicker';
import ReactDOM, { render } from 'react-dom';
import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';



import { Field, Form, Formik, FormikProps, FieldArray } from 'formik';
import * as yup from 'yup';

const itemSchema = yup.object({
    task: yup.string().required(),
    note: yup.string(),
    priority: yup.string().test('num', 'Please select a priority', (val) => {return ((parseInt(val) < 4 && parseInt(val) >= 0) || val == null);}),
})

export default function AddTodo({ submitHandler }){
    return (
        <View>
            {/* <Text style={styles.instructionText}>Fill in the input fields. </Text>
            <Text style={styles.instructionText2} >* means the field is required</Text> */}
            <Formik
                    initialValues={{task: '', note: '', priority: '0', subTasks: []}} //add due-date and repetition later
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

                        <View style={{maxHeight:"30%"}}>
                        <FlatList
                        // style={{flex: 1}}
                        data = {props.values.subTasks}
                        renderItem = {({item, index}) => {
                            console.log(item)
                            return(
                                <View style={{flexDirection:'row', alignItems:'center', flex: 1}}>
                                    <TextInput 
                                    style={[globalStyles.input, {flex: 1, alignItems: 'center', justifyContent: 'center'}]}
                                    placeholder={`Subtask ${index+1}...`}
                                    onChangeText={props.handleChange(`subTasks[${index}].text`)}
                                    onBlur={props.handleBlur(`subTasks[${index}].text`)}
                                    value={props.values.subTasks[index].text}
                                    >
                                    </TextInput>
                                    <Ionicon name="remove" color="black" size={30} style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center',}} onPress={() => props.setFieldValue('subTasks', props.values.subTasks.filter(subtask => subtask.key !== props.values.subTasks[index].key)) }  title="P2" />

                                </View>

                            )
                        }}
                        >
                        </FlatList>

                        {/* {props.values.subTasks.map(({ text }, index) => (
                        <View key = {uuidv4()} style={{flexDirection:'row'}}>
                            <View key={uuidv4()}>
                                <TextInput
                                style={globalStyles.input}
                                key={uuidv4()}
                                placeholder={`Subtask ${index+1}...`}

                                onChangeText={props.handleChange(`subTasks[${index}].text`)}
                                onBlur={props.handleBlur(`subTasks[${index}].text`)}
                                value={props.values.subTasks[index].text}
                                />

                            </View>
                            <View key={uuidv4()}>
                                <Ionicon name="remove" color="black" size={30} key={uuidv4()} onPress={() => props.setFieldValue('subTasks', props.values.subTasks.filter(subtask => subtask.key !== props.values.subTasks[index].key)) }  title="P2" />
                            </View>
                        </View>
                        ))} */}
                        </View>

                        <TextInput  
                            style={globalStyles.input}
                            placeholder='Notes...'
                            miltiline minHeight={60}
                            onChangeText={props.handleChange('note')}
                            value={props.values.note}
                            onBlur={props.handleBlur('note')}
                        />
                        {/* <TextInput 
                            style={globalStyles.input}
                            placeholder='Priority (1-3)'
                            onChangeText={props.handleChange('priority')}
                            value={props.values.priority}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('priority')}
                        /> */}
                        <Text style={globalStyles.errorText}>
                            {props.touched.priority && props.errors.priority}
                        </Text>


                        <View style={{flexDirection: 'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        {/* <Button onPress={() => props.setFieldValue('priority', '2')} title="P2" />
                        <Button onPress={() => props.setFieldValue('priority', '3')} title="P3" />
                        <Button onPress={() => props.setFieldValue('priority', '4')} title="P4" /> */}

                        
                        <Text style={{fontSize:16, marginRight: 30}}>Priority</Text> 

                        <TouchableOpacity>
                            <Icon name="flag" color="#111111" size={30} style={[styles.priority, props.values.priority=='1' ? styles.prioritySelected : {}]} onPress={() => props.setFieldValue('priority', '1')} title="P1" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="flag" color="#333333" size={30} style={[styles.priority, props.values.priority=='2' ? styles.prioritySelected : {}]} onPress={() => props.setFieldValue('priority', '2')} title="P2" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="flag" color="#555555" size={30} style={[styles.priority, props.values.priority=='3' ? styles.prioritySelected : {}]} onPress={() => props.setFieldValue('priority', '3')} title="P3" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="flag" color="#999999" size={30} style={[styles.priority, props.values.priority=='4' ? styles.prioritySelected : {}]} onPress={() => props.setFieldValue('priority', '4')} title="P4" />
                        </TouchableOpacity>
                        
                        </View>
                        <Button onPress={() => props.setFieldValue('subTasks', [...props.values.subTasks, {text: '',  key: uuidv4()}])} title="Add subtask" />


                        <Button title="Set Task" onPress={props.handleSubmit} />
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
    priority:{

    },
    prioritySelected:{
        borderColor:'black',
        borderWidth:1,
        borderRadius:5
    }
})