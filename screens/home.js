import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Button, Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../components/header'
import TodoItem from '../components/todoItem'
import AddTodo from '../components/addTodo.js'

import Creature from '../classes/Creature'

export default function Home({ navigation }) {
  const [todos, setTodos] = useState([
    { task: 'Default 1', note: '', priority: '0', isComplete: false, creature: new Creature(), key: '1' },
    { task: 'Default 2', note: '', priority: '0', isComplete: false, creature: new Creature(), key: '2' },
    { task: 'Default 3', note: '', priority: '0', isComplete: false, creature: new Creature(), key: '3' },
    { task: 'Default 4', note: '', priority: '0', isComplete: false, creature: new Creature(), key: '4' },
  ]);

  const [modalOpen, setModalOpen] = useState(false); //used for the modal

  const removeHandler = (key) => { //removes item from list
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const addCompleteItem = (item) => { //adds completed item to the bottom of the list
    item.isComplete = true;
    setTodos((currentTodos) => {
      return [...currentTodos, item];
    })
  };

  const completeHandler = (key, item) => {
    removeHandler(key);
    addCompleteItem(item);
  }

  const navigateDetailHandler = (myItem) => {
    // console.log("item is", myItem)
    navigation.navigate('TodoDetails', myItem)
    // navigation.push('TodoDetails')

  }

  const addItem = (item) => {
    item.key = Math.random().toString();
    item.isComplete = false;
    item.creature = new Creature();
    if(item.priority == null) {
      item.priority = 0;
    }
    if(item.note == '') {
      item.note = '';
    }
    setTodos((currentTodos) => {
      return [item, ...currentTodos];
    })
    setModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Modal visible={modalOpen} animationType='slide' style={styles.modal}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Icon style={styles.modalToggle} name="close" size={30} onPress={() => setModalOpen(false)} />
              <AddTodo submitHandler={addItem} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Button color='#3f72af' title="Add Item" onPress={() => setModalOpen(true)}/> 

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
  modalContent: {
    padding: 20,
    flex: 1,
  },
  modalToggle: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 0,
  }
});
