import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ADD_EXP, REMOVE_EXP, ADD_LVL, REMOVE_LVL } from './userActions';
import AsyncStorage from '@react-native-community/async-storage';

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXP:
      var newExp = state['exp']+action.addExp
      var newLvl = state['lvl']
      var newExpNextLvl = state['expNextLvl']
      console.log(state['expNextLvl'])
      if (newExp > state['expNextLvl'])
      {
        newExp = 0
        newLvl += 1
        newExpNextLvl += 10
        console.log("lvl up")
      }
      return { ...state, exp: newExp, lvl: newLvl, expNextLvl: newExpNextLvl, tasksCompleted: state['tasksCompleted']+action.addTask }
    // case REMOVE_EXP:
    // return state.filter(c => c.key !== action.creature.key);
    default:
      return state;
  }
};
  
  export default userReducer;