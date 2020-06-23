import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo.js'
import Home from './screens/home'

import Navigate from './routes/homeStack'

export default function App() {
  return(
    <Navigate />
  )
};