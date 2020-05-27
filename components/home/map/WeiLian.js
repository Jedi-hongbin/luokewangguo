import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native'

export default class Weilian extends Component {
  state = {
    gif: require('../../../assets/image/weiliangubao.gif'),
    abuUri: 'https://img-blog.csdnimg.cn/20200523123703145.png'
  }
  componentDidMount() {
  }
  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <TouchableOpacity onPress={this.captureSpirit} >
          <Image style={styles.abu} source={{ uri: this.state.abuUri }} resizeMode='center' />
        </TouchableOpacity>
        <Image style={[styles.bgImg, { top: screenHeight * -0.13, width: screenWidth, height: screenHeight + 20 }]} resizeMode='stretch' resizeMethod='scale' source={this.state.gif} />
      </View>
    )
  }
  captureSpirit = () => {
    this.props.navigation.navigate('pk',{
      spirit: this.props.spirit,
        spiritUri: this.props.spiritUri,
        bgImg: this.state.gif,
        userName: this.props.userName,
        bossName: '阿布',
        bossUri: {uri: this.state.abuUri},
        wuQiUri: {uri: this.state.abuUri}
    })
  }
}
const styles = StyleSheet.create({
  abu: {
    width: 80,
    height: 80,
    marginTop: 150
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
    zIndex: -2
  }
})
