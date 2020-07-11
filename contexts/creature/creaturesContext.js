import React, { createContext, useReducer } from 'react';
import creaturesReducer from './creaturesReducer'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Creature from '../../classes/Creature'

const initialCreatures = [
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
  {creature: new Creature(), key: uuidv4()},
]

export const CreaturesContext = createContext();
export const CreaturesDispatchContext = createContext();

export function CreaturesProvider(props) {
    const [creatures, creaturesDispatch] = useReducer(creaturesReducer, initialCreatures);
  
    return (
      <CreaturesContext.Provider value={creatures}>
        <CreaturesDispatchContext.Provider value={creaturesDispatch}>
          {props.children}
        </CreaturesDispatchContext.Provider>
      </CreaturesContext.Provider>
    );
  }
  