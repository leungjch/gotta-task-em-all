import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ADD_TODO, REMOVE_TODO, COMPLETE_TODO, UNDO_COMPLETE_TODO } from './todosActions';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const todosReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ task: action.item.task, note: action.item.note, priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4(), subTasks: action.item.subTasks }, ...state];
    case REMOVE_TODO:
      return state.filter(todo => todo.key !== action.item.key);
    case COMPLETE_TODO:
        return [...state, { ...action.item, isComplete: true }];
    case UNDO_COMPLETE_TODO:
        return [{ ...action.item, isComplete: false }, ...state];

    default:
      return state;
  }
};
export default todosReducer;