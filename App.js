import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login/Login'
import Enter from './components/enter/Enter'
import EnterAnimated from './components/enter/EnterAnimated'
import Home from './components/home/Home'
import Pk from './components/home/Pk'
// 顶部状态栏设置
StatusBar.setBarStyle('dark-content', true);
StatusBar.setBackgroundColor('transparent', true);
StatusBar.setTranslucent(true);

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(10, 205, 85)',
    background: '#fffae5'
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#222'
  }
}

function App () {
  // AsyncStorage.clear()
  return (
    <NavigationContainer theme={(new Date().toLocaleTimeString().substring(0, 2) === '下午' && Number(new Date().toLocaleTimeString().substring(2, 3)) >= 6) ? MyDarkTheme : MyTheme}>
      <Stack.Navigator screenOptions={{ header: () => { } }}>
        <Stack.Screen name='enterAnimated' component={EnterAnimated} />
        <Stack.Screen name='enter' component={Enter} initialParams={{ name: '老九' }} />
        <Stack.Screen name='login'>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='pk' component={Pk} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
