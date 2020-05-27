/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
/**
 *
 *
 * @returns
 */
import { Provider } from 'react-redux'
import store from './redux/index'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(10, 205, 85,0.8)',
    accent: 'tomato'
  }
}

function Main () {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
