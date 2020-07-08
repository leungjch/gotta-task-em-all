import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Button, Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddTodo from '../components/addTodo.js'

import Creature from '../classes/Creature'

export default function Home({ navigation }) {
  const [todos, setTodos] = useState([
    { task: 'Default 1', note: '', priority: '0', isComplete: false, key: '1', subItems: [{task: 'Default sub 1.1', note: '', priority: '0', isComplete: false, key: Math.random().toString()}]},
    { task: 'Default 2', note: '', priority: '0', isComplete: false, key: '2', subItems: [{task: 'Default sub 1.2', note: '', priority: '0', isComplete: false, key: Math.random().toString()}]},
    { task: 'Default 3', note: '', priority: '0', isComplete: false, key: '3', subItems: [{task: 'Default sub 1.3', note: '', priority: '0', isComplete: false, key: Math.random().toString()}] },
    { task: 'Default 4', note: '', priority: '0', isComplete: false, key: '4', subItems: [{task: 'Default sub 1.4', priority: '0', isComplete: false, key: Math.random().toString()}] },
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
    if(item.isComplete == false) {
      removeHandler(key);
      addCompleteItem(item);
    } else { //if user changes status form complete to not complete, item goes to top of list
      removeHandler(key)
      addItem(item)
    }
  };

  const addItem = (item) => {
    item.key = Math.random().toString();
    item.isComplete = false;
    item.creature = new Creature();
    item.subItems = [{task: 'Default sub-item', note: '', priority: '0', isComplete: false, creature: new Creature(), key: Math.random().toString()}];
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
              <TouchableOpacity onPress={() => {navigation.navigate("Task Details", {item: item})}}>
                <View style={styles.item}>
                    <Icon name={item.isComplete === true ? "check-box" : "check-box-outline-blank"} color="#3f72af" size = {22} onPress = {() => completeHandler(item.key, item)} />
                    <Text style={styles.itemText}>{item.task} </Text>
                    <Icon name="remove" size = {18} onPress={() => removeHandler(item.key)} style={styles.itemRemove} />
                </View>
            </TouchableOpacity>
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
  },
  item: {
    // backgroundColor: "#caf0f8",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',

},
itemText: {
    marginLeft: 10,
},
itemRemove: {
    marginLeft: 'auto'
}
});
