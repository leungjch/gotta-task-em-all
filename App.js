import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo.js'

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'finish math homework ', key: '1' },
    { text: 'text John about meetup', key: '2' },
    { text: 'go to the gym', key: '3' },
    { text: 'learn code', key: '4' },

  ]);

  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 0)
    {
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString() },
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
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
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
