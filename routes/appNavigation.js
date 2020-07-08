import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Home from '../screens/home';
import TodoDetails from '../screens/todoDetails';
import Progress from '../screens/progressProfile';




const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
     <HomeStack.Screen name="Tasks" component={Home} /> 
     <HomeStack.Screen name="TodoDetails" component={TodoDetails} />
    </HomeStack.Navigator>
   );
 }

export default function Navigate()
{
    return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Tasks') {
                  iconName = focused
                    ? 'checkbox'
                    : 'checkbox-outline';
                } else if (route.name === 'Progress') {
                  iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'mediumseagreen',
              inactiveTintColor: 'gray',
              activeBackgroundColor: 'aliceblue'

            }}>
            <Tab.Screen name="Tasks" component={HomeStackScreen} />
            <Tab.Screen name="Progress" component={Progress} />
          </Tab.Navigator>
        </NavigationContainer>
      );
}
