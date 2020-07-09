import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ADD_CREATURE, REMOVE_CREATURE } from './creaturesActions';
import AsyncStorage from '@react-native-community/async-storage';
import Creature from '../../classes/Creature';

const creaturesReducer = (state, action) => {
  switch (action.type) {
    case ADD_CREATURE:
      return [{ creature: new Creature() }, ...state];
    case REMOVE_CREATURE:
      return state.filter(c => c.key !== action.creature.key);
    default:
      return state;
  }
};
  
  export default creaturesReducer;