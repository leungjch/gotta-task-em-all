import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/home';
import TodoDetails from '../screens/todoDetails';

// const screens = {
//   Home: {
//     screen: Home,
//   },
//   TodoDetails: {
//     screen: TodoDetails,
//   }
// }

const Stack = createStackNavigator();

// export default createAppContainer(HomeStack)


export default function Navigate()
{
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="TodoDetails" component={TodoDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}
