import React, { createContext, useReducer } from 'react';
import todosReducer from './todosReducer'

const initialTodos = [
  { task: 'Default 1Test', note: 'note 1', priority: '0', isComplete: false, key: '1', subItems: [{task: 'Default sub 1.1', note: 'note 1', priority: '0', isComplete: false, key: Math.random().toString()}]},
  { task: 'Default 2', note: '', priority: '0', isComplete: false, key: '2', subItems: [{task: 'Default sub 1.2', note: 'note 2', priority: '0', isComplete: false, key: Math.random().toString()}]},
  { task: 'Default 3', note: 'note3', priority: '0', isComplete: false, key: '3', subItems: [{task: 'Default sub 1.3', note: 'note 3', priority: '0', isComplete: false, key: Math.random().toString()}] },
  { task: 'Default 4', note: 'note', priority: '0', isComplete: false, key: '4', subItems: [{task: 'Default sub 1.4', note: 'note 4', priority: '0', isComplete: false, key: Math.random().toString()}] }, 
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
  