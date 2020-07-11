import React, { createContext, useReducer } from 'react';
import userReducer from './userReducer'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialUser = {key: uuidv4(), exp: 0, lvl: 0, currency: 0}

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
  