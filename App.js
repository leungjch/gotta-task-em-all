import React from 'react';
import 'react-native-gesture-handler';

import Navigate from './routes/appNavigation';

import { TodosProvider } from './contexts/todo/todosContext'
import { CreaturesProvider } from './contexts/creature/creaturesContext'
import { UserProvider } from './contexts/user/userContext'

export default function App() {
  return(
    <UserProvider>
      <TodosProvider>
        <CreaturesProvider>
          <Navigate />
        </CreaturesProvider>
      </TodosProvider>
      </UserProvider>
  )
};