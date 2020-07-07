import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      />
    );
  }
}