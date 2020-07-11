// TODO: A "profile" screen showing charts and statistics about tasks completed, creatures caught, etc
import React, {useState, useContext} from 'react';

import { Text, View, processColor, StyleSheet, AppRegistry } from 'react-native';

import { UserDispatchContext } from '../contexts/user/userContext';
import { UserContext } from '../contexts/user/userContext'

import { CreaturesDispatchContext } from '../contexts/creature/creaturesContext';
import { CreaturesContext } from '../contexts/creature/creaturesContext'

import {BarChart, LineChart} from 'react-native-charts-wrapper';


export default function Progress({ navigation, route }) {
    const user = useContext(UserContext);
    const userDispatch = useContext(UserDispatchContext);
    
    const creatures = useContext(CreaturesContext);
    const creaturesDispatch = useContext(CreaturesDispatchContext);

    // const state = {
    //   legend: {
    //     enabled: false,
    //     textSize: 14,
    //     form: 'SQUARE',
    //     formSize: 14,
    //     xEntrySpace: 10,
    //     yEntrySpace: 5,
    //     formToTextSpace: 5,
    //     wordWrapEnabled: true,
    //     maxSizePercent: 0.5
    //   },
    //   data: {
    //     dataSets: [{
    //       values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}],
    //       label: 'Bar dataSet',
    //       config: {
    //         color: processColor('teal'),
    //         barShadowColor: processColor('lightgrey'),
    //         highlightAlpha: 90,
    //         highlightColor: processColor('red'),
    //       }
    //     }],

    //     config: {
    //       barWidth: 0.7,
    //     }
    //   },
    //   highlights: [{x: 3}, {x: 6}],
    //   xAxis: {
    //     valueFormatter: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //     drawGridLines: false,
    //     granularityEnabled: true,
    //     granularity : 1,
    //   }
    // };
    

    console.log(user['cumulativeExpHistory'])

    return (
      <View style={{flex: 1}}>
        <Text>Your Progress</Text>
        <Text>Total Tasks Completed: {user['tasksCompleted']}</Text>
        <Text>Creatures Collected: {creatures.length}</Text>

        {/* <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={state.data}
            xAxis={state.xAxis}
            animation={{durationX: 500}}
            legend={state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: { min: 0, max: 7 }}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            scaleEnabled={false}
            // onSelect={this.handleSelect.bind(this)}
            highlights={state.highlights}
          />
        </View> */}
          <View style={styles.container}>
          <LineChart style={styles.chart}
          drawGridBackground={false}

          // scaleEnabled={false}
          // visibleRange={ {  x: {    min: user['cumulativeExpHistory'][0]['x'],    max: user['cumulativeExpHistory'][user['cumulativeExpHistory'].length-1]['x']  }}}            
          // visibleRange={ {  x: {    min: 0,    max: user['cumulativeExpHistory'].length-1  }}}            

          data={{
            dataSets: [{
              // values: [
              //   { x: 1594485267, y: 0.88 },
              //   { x: 1594586500, y: 0.58 },
              //   { x: 1594586600, y: 0.9 },
              //   { x: 1594586700, y: 2.8 },


              //   { x: 1594697300, y: 0.28 },
              //   { x: 1594798350, y: 0.100 },

              // ],
              values: user['cumulativeExpHistory'],
              // values: user['frequencyExpHistory'],

              label: 'XP',
              config:{
                lineWidth: 1,
                circleRadius: 10,

                // drawFilled: true,
                drawFilled: true,

                fillColor: processColor('blue'),
                fillAlpha: 60,
                },
            }],

          }}
          yAxis={{
            drawGridLines:false
          }}
          xAxis={{
            valueFormatter: 'date',
            // valueFormatterPattern:'yyyy/MM/dd HH:mm:ss',
            // valueFormatterPattern: "HH:mm dd-MM",
            valueFormatterPattern: "HH:mm",
            drawGridLines: false,
            // valueFormatterPattern: "dd-MM-YYYY",
            // valueFormatterPattern: "mm:ss",
            // valueFormatterPattern: "ss",

            timeUnit: 'SECONDS',
            position: 'BOTTOM',
            axisMinimum: user['cumulativeExpHistory'][0]['x'],
            axisMaximum: user['cumulativeExpHistory'][user['cumulativeExpHistory'].length-1]['x']+100,
            // since: 0

              }}
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
