import React, { Component } from 'react'
import { Text, View, Image, Alert, StyleSheet, Dimensions, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { Tooltip } from 'react-native-elements';

export default class RenYuWan extends Component {
  state = {
    speak: '美食家，叫老八',
    bgImg: require('../../../assets/image/renyuwan.gif'),
    opacity: new Animated.Value(0),
    Value: 1
  }
  componentDidMount() {
    const that = this
    setTimeout(function fn(){
      that.fade(that.state.Value)
      setTimeout(fn,2000)
    },2000)
  }
  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={this.pkOldEight}
          style={{ width: 150, height: 100 }} >
          <Image style={[styles.boss]} resizeMode='center' source={require('../../../assets/image/boos8.gif')} />
          <Animated.View style={[styles.speak, {opacity:this.state.opacity}]}>
            <Text style={styles.text}>{this.state.speak}</Text>
            <Text style={styles.mark}></Text>
          </Animated.View>
        </TouchableOpacity>

        <Image style={[styles.bgImg, {top: -screenHeight * 0.14, width: screenWidth, height: screenHeight + 20}]} resizeMode='stretch' resizeMethod='scale' source={this.state.bgImg} />
      </View>
    )
  }
  pkOldEight = () => {
    Alert.alert('提示', '确定要挑战老八', [
      { text: '不了不了', onPress: () => this.setState({speak: '美汁汁'})  },
      { text: '我再准备下', onPress: () => this.setState({speak: '干就完了'})},
      { text: '干就完了', onPress: () => {this.setState({speak: '奥力给'}); setTimeout(()=>{
        this.props.navigation.navigate('pk',{
          spirit: this.props.spirit,
          spiritUri: this.props.spiritUri,
          bgImg: require('../../../assets/image/renyuwanpng.png'),
          userName: this.props.userName,
          bossName: '老八',
          bossUri: require('../../../assets/image/boos8.gif'),
          wuQiUri: require('../../../assets/image/bianbian.png')
        })
      },300) } },
    ])
  }
  fade = (toValue) => {
    Animated.timing(this.state.opacity,{
      toValue,
      duration: 2000,
      useNativeDriver: false
    }).start()
    this.setState({Value: toValue === 0 ? 1 : 0})
  }
}
const styles = StyleSheet.create({
  text: {
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 30,
    height: 30
  },
  mark: {
    width: 0,
    borderColor: 'transparent',
    borderLeftWidth: 5,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 5,
    borderTopColor: '#fff',
    transform: [{ translateY: -2 }, { translateX: 8 }]
  },
  speak: {
    position: "absolute",
    width: 90,
    height: 40,
    marginLeft: 60,
  },
  boss: {
    width: 100,
    height: 100,
  },
  bgImg: {
    position: 'absolute',
    zIndex: -1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
    paddingLeft: 300,
    paddingTop: 100
  }
})
