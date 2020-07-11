// TODO: A "profile" screen showing charts and statistics about tasks completed, creatures caught, etc
import React, {useState, useContext} from 'react';

import { Text, View } from 'react-native';

import { UserDispatchContext } from '../contexts/user/userContext';
import { UserContext } from '../contexts/user/userContext'

import { CreaturesDispatchContext } from '../contexts/creature/creaturesContext';
import { CreaturesContext } from '../contexts/creature/creaturesContext'



export default function Progress({ navigation, route }) {
    const user = useContext(UserContext);
    const userDispatch = useContext(UserDispatchContext);
    
    const creatures = useContext(CreaturesContext);
    const creaturesDispatch = useContext(CreaturesDispatchContext);
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your Progress</Text>
        <Text>Total Tasks Completed: {user['tasksCompleted']}</Text>
        <Text>Creatures Collected: {creatures.length}</Text>

      </View>
    );
  }