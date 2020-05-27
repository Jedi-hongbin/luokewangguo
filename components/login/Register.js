import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { Button } from '@ant-design/react-native'
import Orientation from 'react-native-orientation'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class Register extends Component {
  state = {
    name: '',
    passWord: ''
  }
  componentDidMount () {
    this.defaultName()
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Icon style={styles.icon} color="#000" size={30} name='bars' onPress={() => this.props.navigation.openDrawer()} />
        <Text>亲爱的小老八，告诉我你的昵称</Text>
        <TextInput placeholder='小老八' placeholderTextColor="#ccc" style={styles.Input} value={this.state.name} onChangeText={(name) => this.setState({ name })} />
        <Text>你的密码</Text>
        <TextInput secureTextEntry={true} keyboardType='number-pad' style={styles.Input} value={this.state.passWord} onChangeText={(passWord) => this.setState({ passWord })} />
        <TouchableOpacity style={styles.btn} onPress={this.register}>
          <Image style={{ top: -120, left: 80 }} source={require('../../assets/image/enter_bg.jpg')} resizeMode='cover' />
          <Text style={styles.T}>登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
  defaultName = async () => {
    const name = await AsyncStorage.getItem('userName')
    this.setState({name})
  }
  register = async() => {
    if (this.state.name?.length >= 1){
      await AsyncStorage.setItem('userName',this.state.name)
      let account = {
        name: this.state.name,
        passWord: this.state.passWord,
        screenWidth,
        screenHeight
      }
      this.props.navigation.navigate('enter', account)
      Orientation.lockToLandscape()
    } else {
      Alert.alert('温馨提示', '老八对您说，昵称他得有', [
        { text: '听老八的' },
        { text: '听老八的' },
        { text: '听老八的' },
      ])
    }
  }
}
const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 50,
    left: 30
  },
  T: {
    position: 'absolute',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  btn: {
    backgroundColor: '#ddd',
    marginTop: 20,
    overflow: 'hidden',
    height: 60,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'rgba(240,255,240,0.5)'
  },
  wrapper: {
    flex: 1,
    // backgroundColor: '#fffae5',
    padding: 20,
    paddingTop: screenHeight * 0.3
  }
})
