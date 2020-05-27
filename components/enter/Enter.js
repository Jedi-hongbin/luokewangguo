import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar , Image, Dimensions, TouchableOpacity } from 'react-native'
import Orientation from 'react-native-orientation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from '@ant-design/react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'

StatusBar.setHidden(true)
let screenWidth = Dimensions.get('window').height + 50
let screenHeight = Dimensions.get('window').width
function W(num) {
  return screenWidth * num / 100
}
function H(num) {
  return screenHeight * num / 100
}
export default class Enter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isBool: Orientation.getInitialOrientation() === 'PORTRAIT',// 当前是否是竖屏(true),横屏(false)
      userName: ''
    }

  }

  componentDidMount() {
    Orientation.lockToLandscape() // 转成横屏
    this.getUserName()
  }

  render() {
    const Width = Dimensions.get('window').width
    const Height = Dimensions.get('window').height
    return (
      <View style={styles.bg}>
        <TouchableOpacity style={styles.signOut} onPress={this._signOut}>
          <Icon name='sign-out' color='#ffe' size={30} />
          <Text style={{ marginLeft: 5, color: '#ff0' }}>登出</Text>
        </TouchableOpacity>
        <Text onPress={()=>AsyncStorage.clear()} style={styles.userName}>欢迎小老八：{this.props.route.params.name}</Text>

        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#33f', '#fffae5']} style={styles.btn}>
          <TouchableOpacity onPress={this.playGame}>
            <Text style={styles.text}>进入游戏</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.warningText}>本游戏仅供学习使用，请勿用于商用</Text>
        <Text style={styles.warningText}>宏斌出品必属精品</Text>
        <Image style={[styles.bgImg,{width:900,height:400}]} source={require('../../assets/image/enter_bg.jpg')} resizeMode='cover' />
      </View>
    )
  }
  playGame = () => {
    this.props.navigation.navigate('home',{name:this.props.route.params.name})
  }
  getUserName = async () => {
    const userName = await AsyncStorage.getItem('userName')
    if(userName === null) {
      console.log('没有登录')
      this.props.navigation.navigate('login')
      Orientation.lockToPortrait()
    } else {
      console.log('登录名'+ this.props.route.params.name)
    }
  }
  _signOut = () => {
    this.props.navigation.navigate('login')
    Orientation.lockToPortrait()
  }
}
const styles = StyleSheet.create({
  userName: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    position: 'absolute',
    top: W(2),
    left: W(2)
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 20,
    marginRight: 10
  },
  warningText: {
    color: '#afa',
    fontSize: 12,
    marginLeft: 'auto'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textShadowColor: '#00f'
  },
  btn: {
    borderRadius: 30,
    marginTop: 'auto',
    width: 200,
    height: 50,
    marginBottom: W(3),
    elevation: 8,
    borderBottomWidth: 3,
    borderColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgImg: {
    position: 'absolute',
    zIndex: -100
  },
  bg: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
