import React from 'react';
import 'react-native-gesture-handler';

import Navigate from './routes/appNavigation';

import { TodosProvider } from './contexts/todo/todoContext'

export default function App() {
  return(
    <TodosProvider>
    <Navigate />
    </TodosProvider>

  )
};