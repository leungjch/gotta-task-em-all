import React from 'react';
import 'react-native-gesture-handler';

import Navigate from './routes/appNavigation';

import { TodosProvider } from './contexts/todo/todosContext'
import { CreaturesProvider } from './contexts/creature/creaturesContext'

export default function App() {
  return(
    <TodosProvider>
      <CreaturesProvider>
        <Navigate />
      </CreaturesProvider>
    </TodosProvider>
  )
};