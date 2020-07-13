import React, { createContext, useReducer } from 'react';
import todosReducer from './todosReducer'
import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';

const initialTodos = [
  { task: 'Default 1Test', note: 'note 1', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4(), subTasks: [{task: 'Default sub 1.1', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4()}]},
  { task: 'Default 2', note: '', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4(), subTasks: [{task: 'Default sub 1.2', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4()}]},
  { task: 'Default 3', note: 'note3', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4(), subTasks: [{task: 'Default sub 1.3', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4()}] },
  { task: 'Default 4', note: 'note', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4(), subTasks: [{task: 'Default sub 1.4', priority: '0', isComplete: false, creationDate: Math.floor(Date.now()), key: uuidv4()}] }, 
]

export const TodosContext = React.createContext();
export const TodosDispatchContext = React.createContext();

export function TodosProvider(props) {
    const [todos, todosDispatch] = useReducer(todosReducer, initialTodos);
  
    return (
      <TodosContext.Provider value={todos}>
        <TodosDispatchContext.Provider value={todosDispatch}>
          {props.children}
        </TodosDispatchContext.Provider>
      </TodosContext.Provider>
    );
  }
  