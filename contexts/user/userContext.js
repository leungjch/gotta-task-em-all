import React, { createContext, useReducer } from 'react';
import userReducer from './userReducer'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const initialUser = {key: uuidv4(), exp: 10, lvl: 0, expNextLvl: 10, currency: 0, 
                    tasksCompleted: 0, creaturesCollected: 0, 
                    cumulativeExpHistory: [{x: Math.floor(Date.now()/1000)-500, y: 0},
                                          {x: Math.floor(Date.now()/1000), y: 10}],
                    frequencyExpHistory: []}

export const UserContext = createContext();
export const UserDispatchContext = createContext();

export function UserProvider(props) {
    const [user, userDispatch] = useReducer(userReducer, initialUser);
  
    return (
      <UserContext.Provider value={user}>
        <UserDispatchContext.Provider value={userDispatch}>
          {props.children}
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    );
  }
  