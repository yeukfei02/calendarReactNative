import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainView from './src/components/mainView/MainView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <MainView />
    </View>
  );
}

export default App;
