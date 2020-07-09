import React from 'react';

import Creature from './classes/Creature';





/**
 * Global State provider & hooks
 */
export const GlobalStateProvider = ({ children }) => {

  // Store todo state globally
  const todoInitialState = { todos: [
    { task: 'Default 1Test', note: 'note 1', priority: '0', isComplete: false, key: '1', subItems: [{task: 'Default sub 1.1', note: 'note 1', priority: '0', isComplete: false, key: Math.random().toString()}]},
    { task: 'Default 2', note: '', priority: '0', isComplete: false, key: '2', subItems: [{task: 'Default sub 1.2', note: 'note 2', priority: '0', isComplete: false, key: Math.random().toString()}]},
    { task: 'Default 3', note: 'note3', priority: '0', isComplete: false, key: '3', subItems: [{task: 'Default sub 1.3', note: 'note 3', priority: '0', isComplete: false, key: Math.random().toString()}] },
    { task: 'Default 4', note: 'note', priority: '0', isComplete: false, key: '4', subItems: [{task: 'Default sub 1.4', note: 'note 4', priority: '0', isComplete: false, key: Math.random().toString()}] }, ]
  , setTodos: undefined};
  // Add later
  // const todosStatsInitialState = { text: "foo", setText: undefined };
  const creaturesInitialState = { creatures: [new Creature(), new Creature()]
      , setCreatures: undefined };
  const userInitialState = {exp: 0, currency: 0, setUser: undefined}

  const TodoStateContext = React.createContext(todoInitialState)
  const CreatureStateContext = React.createContext(creaturesInitialState)
  const UserStateContext = React.createContext(userInitialState)


  const [todos, setTodos] = React.useState(todoInitialState.todos);
  const [creatures, setCreatures] = React.useState(creaturesInitialState.creatures);
  const [user, setUser] = React.useState(userInitialState.user);

  const todoContextValue = React.useMemo(() => ({todos, setTodos}), [todos]);
  const creatureContextValue = React.useMemo(() => ({creatures, setCreatures}), [creatures]);
  const userContextValue = React.useMemo(() => ({user, setUser}), [user]);


  return (
    <UserStateContext.Provider value={todoContextValue}>
      <CreatureStateContext.Provider value={creatureContextValue}>
        <TodoStateContext.Provider value={userContextValue}>
          {children}
        </TodoStateContext.Provider>
      </CreatureStateContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useTodoState = () => React.useContext(TodoStateContext);
export const useTextState = () => React.useContext(TextStateContext);
export const useBoolState = () => React.useContext(BoolStateContext);