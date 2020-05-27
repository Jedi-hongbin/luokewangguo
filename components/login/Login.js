import React, { Component } from 'react'
import { Text, Switch, View, Image, Dimensions, Linking, BackHandler, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import Register from './Register'
import Account from './Account'
StatusBar.setHidden(false)
const Drawer = createDrawerNavigator()

export default function LogIn () {
  return (
    <Drawer.Navigator
      edgeWidth={80}
      drawerContentOptions={{
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name='register'
        component={Register}
        options={{
          title: '登录/注册',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'bath' : 'battery-empty'} color={color} size={size} />
          )
        }} />
      <Drawer.Screen
        name='account'
        component={Account}
        options={{
          title: '账号信息',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'user' : 'user-o'} color={color} size={size} />
          )
        }} />
    </Drawer.Navigator>
  )
}
function CustomDrawerContent (props) {
  return (
    <DrawerContentScrollView {...props} style={{ paddingTop: 30 }}>
      <View style={{ flex: 1, minHeight: Dimensions.get('window').height }}>
        <Image style={{ borderRadius: 150, width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }} source={require('../../assets/image/enter_bg2.jpg')} resizeMode='cover' />
        <DrawerItemList {...props} />
        <DrawerItem
          {...props}
          icon={({ focused, size, color }) => <Icon name='users' size={size} color={color} />}
          onPress={() => Linking.openURL('http://hongbin.xyz')}
          label='关于我们' />
        <Switch
          {...props}
          value={props.scheme === 'dark'}
          onValueChange={()=>{}}
        /> 
        <View style={{ width: 300, height: 300, backgroundColor: '#ddd', overflow: 'hidden', borderRadius: 200, marginLeft: 'auto', marginRight: -150 }}>
          <Image style={{ width: 300, height: 300 }} source={require('../../assets/image/enter_bg1.jpg')} resizeMode='cover' />
        </View>
        <View style={{ width: 200, height: 200, backgroundColor: '#ddd', overflow: 'hidden', borderRadius: 200, marginTop: -50, marginLeft: -100 }}>
          <Image style={{ width: 200, height: 200 }} source={require('../../assets/image/enter_bg2.jpg')} resizeMode='cover' />
        </View>
        <Icon style={{ position: 'absolute', left: 10, transform: [{ rotate: '180deg' }] }} onPress={() => BackHandler.exitApp()} name='sign-out' size={30} color='#333' />
      </View>
    </DrawerContentScrollView>
  )
}