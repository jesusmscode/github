import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

import WebView from 'react-native-webview';

export const WebUserScreen = ({route}) => {
  const {url} = route.params;
  return (
    <View style={styles.container}>
      <WebView source={{uri: url}} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  webview: {
    flex: 1,
  },
});
