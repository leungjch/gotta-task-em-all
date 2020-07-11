import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ADD_EXP, REMOVE_EXP, ADD_LVL, REMOVE_LVL } from './userActions';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXP:
      var newExp = state['exp']+action.addExp
      var newLvl = state['lvl']
      var newExpNextLvl = state['expNextLvl']
      var oldTime = state['cumulativeExpHistory'][state['cumulativeExpHistory'].length-1]['x']
      console.log(state['expNextLvl'])
      if (newExp >= state['expNextLvl'])
      {
        newLvl += 1
        newExpNextLvl += newExp/2 + 10
        console.log("lvl up")
      }
      return { ...state, 
        exp: newExp, 
        lvl: newLvl, 
        expNextLvl: newExpNextLvl, 
        tasksCompleted: state['tasksCompleted']+action.addTask,
        cumulativeExpHistory: [...state['cumulativeExpHistory'], {x: Math.floor((Date.now()/1000)), y: newExp }],
        // cumulativeExpHistory: [...state['cumulativeExpHistory'], {x: Math.ceil(oldTime+Math.ceil(Math.random()*5000)), y: newExp }],

        frequencyExpHistory: [...state['frequencyExpHistory'], {x: Date.now()/1000, y: action.addExp }]
      }

    // case REMOVE_EXP:
    // return state.filter(c => c.key !== action.creature.key);
    default:
      return state;
  }
};
  
  export default userReducer;