// TODO: A "profile" screen showing charts and statistics about tasks completed, creatures caught, etc
import React, {useState, useContext} from 'react';

import { Text, View, processColor, StyleSheet, AppRegistry } from 'react-native';

import { UserDispatchContext } from '../contexts/user/userContext';
import { UserContext } from '../contexts/user/userContext'

import { CreaturesDispatchContext } from '../contexts/creature/creaturesContext';
import { CreaturesContext } from '../contexts/creature/creaturesContext'

import {BarChart} from 'react-native-charts-wrapper';


export default function Progress({ navigation, route }) {
    const user = useContext(UserContext);
    const userDispatch = useContext(UserDispatchContext);
    
    const creatures = useContext(CreaturesContext);
    const creaturesDispatch = useContext(CreaturesDispatchContext);
    

    const state = {
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}],
          label: 'Bar dataSet',
          config: {
            color: processColor('teal'),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],

        config: {
          barWidth: 0.7,
        }
      },
      highlights: [{x: 3}, {x: 6}],
      xAxis: {
        valueFormatter: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        granularityEnabled: true,
        granularity : 1,
      }
    };
    
    return (
      <View style={{flex: 1}}>
        <Text>Your Progress</Text>
        <Text>Total Tasks Completed: {user['tasksCompleted']}</Text>
        <Text>Creatures Collected: {creatures.length}</Text>

        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={state.data}
            xAxis={state.xAxis}
            animation={{durationX: 2000}}
            legend={state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: { min: 0, max: 7 }}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            // onSelect={this.handleSelect.bind(this)}
            highlights={state.highlights}
          />
        </View>


      </View>
    );


  }

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});
