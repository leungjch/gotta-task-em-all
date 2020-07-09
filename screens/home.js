import React, {useState, useContext} from 'react';
import { StyleSheet, View, FlatList, SectionList, Text, TouchableOpacity, Button, Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddTodo from '../components/addTodo.js'

import Creature from '../classes/Creature'

import { DispatchContext } from '../contexts/todo/todoContext';
import { TodosContext } from '../contexts/todo/todoContext'
import { ADD_TODO, COMPLETE_TODO, UNDO_COMPLETE_TODO, REMOVE_TODO } from '../contexts/todo/actions.js';

export default function Home({ navigation, route }) {

  // const useTodoState = () => React.useContext(TodoStateContext);
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const [modalOpen, setModalOpen] = useState(false); //used for the modal

  // On load screen, check if we came from 
  // From https://reactnavigation.org/docs/params
  // "Passing params to a previous screen" section
  React.useEffect(() => {
    if (route.params?.completed) {
      completeHandler(route.params.completed['item'] )
    }
  }, [route.params?.completed]);

  const removeHandler = (item) => { //removes item from list
    dispatch({ type: REMOVE_TODO, item: item})
  };

  const addCompleteItem = (item) => { //adds completed item to the bottom of the list
    dispatch({ type: COMPLETE_TODO, item: item })
  };
  const undoCompleteItem = (item) => { //adds completed item to the bottom of the list
    dispatch({ type: UNDO_COMPLETE_TODO, item: item })
  };

  const completeHandler = (item) => {
    if(item.isComplete === false) {
      removeHandler(item);
      addCompleteItem(item);
      console.log("removed")

    } else { //if user changes status form complete to not complete, item goes to top of list
      removeHandler(item)
      undoCompleteItem(item)
      console.log("added")
    }
  };

  const addItem = (item) => {
    dispatch({ type: ADD_TODO, item: item})
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
                    <Icon name={item.isComplete ? "check-box" : "check-box-outline-blank"} color="#3f72af" size = {22} onPress = {() => completeHandler(item)} />
                    <Text style={[styles.itemText, item.isComplete ? styles.itemTextComplete : styles.itemTextIncomplete]}>
                      {item.task} 
                    </Text>
                    <Icon name="remove" size = {18} onPress={() => removeHandler(item)} style={styles.itemRemove} />
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
// this is unused because I needed conditional rendering of line-through when task completed
itemText: {
    marginLeft: 10,
},
itemTextComplete: {
  textDecorationLine : 'line-through', 
  color: '#bdc3c7'
},
itemTextIncomplete: {
  textDecorationLine : 'none',
  color: '#34495e'
},
itemRemove: {
    marginLeft: 'auto'
}
});
