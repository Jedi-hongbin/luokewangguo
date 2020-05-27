import React, { Component } from 'react'
import { Image, View, Animated } from 'react-native'
import Orientation from 'react-native-orientation'
import AsyncStorage from '@react-native-community/async-storage'
export default class EnterAnimated extends Component {
  constructor (props) {
    super(props)
    this.state= {
      size : new Animated.Value(0),
      opacity: new Animated.Value(1)
    }
  }
  
  componentDidMount () {
    this.begin()
    Orientation.lockToLandscape() // 转成横屏
  }
  render() {
    return (
      <View style={{backgroundColor: '#000',flex:1,justifyContent: 'center', alignItems: 'center',}}>
        <Animated.Text style={{fontSize: this.state.size,fontWeight: 'bold' ,color:'#fffae5',opacity:this.state.opacity}}> 宏斌出品 必属精品 </Animated.Text>
        <Image style={{position: "absolute",width: 500, height: 300,zIndex: -10}} source={require('../../assets/image/box.jpg')} />
      </View>
    )
  }
  begin = () => {
    Animated.timing(this.state.size,{
      toValue: 50,
      duration: 800,
      useNativeDriver: false
    }).start()
    setTimeout(()=>{
      this.end()
    },1000)
  }
  end = () => {
    Animated.timing(this.state.opacity,{
      toValue: 0,
      duration: 800,
      useNativeDriver: false
    }).start()
    setTimeout(async ()=>{
      const name = await AsyncStorage.getItem('userName')
      this.props.navigation.navigate('enter',{name})
    },1000)
  }
}
