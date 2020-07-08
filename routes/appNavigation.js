import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Home from '../screens/home';
import TodoDetails from '../screens/todoDetails';
import Progress from '../screens/progressProfile';
import CreatureDex from '../screens/creatureDex';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
     <HomeStack.Screen name="Tasks" component={Home} options={{headerShown: false}}/> 
     <HomeStack.Screen name="TodoDetails" component={TodoDetails} />
    </HomeStack.Navigator>
   );
 }

export default function Navigate()
{
    return (
        <NavigationContainer>
          <Tab.Navigator 
            initialRouteName = 'Tasks'

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
                else if (route.name === 'CreatureDex') {
                  iconName = focused ? 'egg' : 'egg-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'mediumseagreen',
              inactiveTintColor: 'gray',
              activeBackgroundColor: 'aliceblue',

            }}
            >
            <Tab.Screen name="CreatureDex" component={CreatureDex} />

            <Tab.Screen name="Tasks" component={HomeStackScreen} />

            <Tab.Screen name="Progress" component={Progress} />

          </Tab.Navigator>
        </NavigationContainer>
      );
}
