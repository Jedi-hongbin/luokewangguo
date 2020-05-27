import React, { Component } from 'react'
import { Text, View, Image , StyleSheet,Dimensions,TouchableOpacity } from 'react-native'

export default class Map extends Component {
  state = {
  }
  componentDidMount () {
  }
  render () {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View style={styles.wrapper}>
        <Text onPress={()=>{this.props.goToWhere('王国城堡',300);console.log('wangguo')}} style={[styles.border, styles.wangGuoChengBao]}></Text>
        {/* 人鱼湾 */}
        <TouchableOpacity
          onPress={()=>this.props.goToWhere('人鱼湾',0)} style={[styles.border, styles.RenYuWan,{
            left: screenWidth * 0.23,
            top: screenHeight * 0.45
          }]} >
        </TouchableOpacity>
        {/* 威廉古堡 */}
        <TouchableOpacity
          onPress={()=>this.props.goToWhere('威廉古堡',30)} style={[styles.border, styles.WeiLian,{
            left: screenWidth * -0.18,
            top: screenHeight * 0.2
          }]} >
        </TouchableOpacity>
        {/* 黑暗基地 */}
        <TouchableOpacity
          onPress={()=>this.props.goToWhere('黑暗基地',0)} style={[styles.border, styles.HeiAnJiDi,{
            left: screenWidth * -0.4,
            top: screenHeight * 0.55
          }]} >
        </TouchableOpacity>

        <Image style={[styles.bgImg,{ width: screenWidth, height: screenHeight }]} resizeMode='stretch' resizeMethod='scale' source={require('../../assets/image/ditu.png')} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  HeiAnJiDi: {
    borderColor: '#f00',
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 100
  },
  WeiLian: {
    borderColor: '#a1f',
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 100
  },
  border: {
    borderRadius: 60,
    borderWidth: 1
  },
  RenYuWan: {
    width: 60,
    height: 60,
    zIndex: 100,
    borderColor: '#f90',
    position: 'absolute'
  },
  wangGuoChengBao:{
    width: 60,
    height: 60,
    zIndex: 10,
    borderColor: '#aff',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
