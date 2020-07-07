import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';


import Header from '../components/header'
import TodoItem from '../components/todoItem'
import AddTodo from '../components/addTodo.js'

import Creature from '../classes/Creature'


export default function Home({ navigation }) {
  const [todos, setTodos] = useState([
    { text: 'review for exams', isComplete: false, creature: new Creature(), key: '1' },
    { text: 'text John about meetup', isComplete: false, creature: new Creature(), key: '2' },
    { text: 'go to the gym', isComplete: false, creature: new Creature(), key: '3' },
    { text: 'learn code', isComplete: false, creature: new Creature(), key: '4' },
  ]);

  const removeHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const completeHandler = (key) => {
    setTodos(todos.map(item => {
      if(item.key !== key) return item 
      return {...item, isComplete: !item.isComplete}
    }) )
  }

  const navigateDetailHandler = (myItem) => {
    console.log("item is", myItem)
    navigation.navigate('TodoDetails', myItem)
    // navigation.push('TodoDetails')

  }

  const submitHandler = (text) => {
    if (text.length > 0)
    {
      setTodos((prevTodos) => {
        return [
          {text: text, isComplete: false, creature: new Creature(), key: Math.random().toString() },
          ...prevTodos
        ];
      })
    }
    else
    {
      Alert.alert('Oops!', 'Please enter a todo.', [
        {text: 'OK', onPress: () => console.log('Alert closed')}
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('Dismissed keyboard')
    }}>
      <View style={styles.container}>
        <Header title={"Your tasks"}/>
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} removeHandler={removeHandler} completeHandler = {completeHandler} navigation={navigation}
               />
              )}
            />
          </View>
        </View>
      </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a6dcef',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
