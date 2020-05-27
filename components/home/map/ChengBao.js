import React, { Component } from 'react'
import { Text, View, Image , StyleSheet,Dimensions, Animated } from 'react-native'

export default class ChengBao extends Component {
  state = {
    opacity: new Animated.Value(0),
    isShow:true
  }
  componentDidMount () {
    setInterval(()=>{
      this.fade(this.state.isShow ? 1 : 0)
    },3000)
  }
  render () {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View style={styles.wrapper}>
        <Animated.Text onPress={()=>this.props.goToWhere('城堡大厅',300)} style={[styles.title,{ opacity:this.state.opacity}]}>城堡大厅</Animated.Text>
        <Image style={[styles.bgImg,{top: screenHeight * -0.13, width: screenWidth, height: screenHeight + 20 }]} resizeMode='stretch' resizeMethod='scale' source={require('../../../assets/image/guowangchengbao.gif')} />
      </View>
    )
  }
  fade = (toValue) => {
    Animated.timing(this.state.opacity,{
      toValue,
      duration: 1000,
      useNativeDriver: false
    }).start()
    this.setState({isShow:!this.state.isShow})
  }
}
const styles = StyleSheet.create({
  title: {
    transform: [{translateX: -12}],
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    transform: [{translateY: -50}],
    fontSize: 15,
  },
  bgImg: {
    position: 'absolute',
    zIndex: -1,
    top: 0
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  }
})
