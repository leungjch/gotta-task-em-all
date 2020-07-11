import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ADD_EXP, REMOVE_EXP, ADD_LVL, REMOVE_LVL } from './userActions';
import AsyncStorage from '@react-native-community/async-storage';

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXP:
      return { exp: state['exp']+action.addExp, lvl: state['lvl'], currency: state['currency']}
    // case REMOVE_EXP:
    //   return state.filter(c => c.key !== action.creature.key);
    default:
      return state;
  }
};
  
  export default userReducer;