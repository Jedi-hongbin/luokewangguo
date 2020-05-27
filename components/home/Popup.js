import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'

export default class Popup extends Component {
  state = {
    name: '喵喵',
    color: '#0f0',
    miaomiaoUri: 'https://img-blog.csdnimg.cn/20200523123636669.png',
    huohuaUri: 'https://img-blog.csdnimg.cn/20200523123636735.png',
    shuilanlanUri: 'https://img-blog.csdnimg.cn/20200523123636737.png'
  }
  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View>
        <Overlay
          overlayStyle={{ width: screenWidth * 0.8, height: screenHeight * 0.8 }}
          isVisible={this.props.visible}>
          <LinearGradient colors={['#fff', this.state.color, '#fff']} start={{ x: 0, y: -1 }} >
            <Text style={styles.title}>这三个神宠相信不用老八给你介绍了吧，选一个吧！</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity onPress={() => this.setState({ name: '喵喵', color: '#0f0' })} style={[styles.selectCard, { width: screenWidth * 0.2, height: screenHeight * 0.5, borderWidth: this.state.name === '喵喵' ? 1 : 0, borderColor: '#0f0' }]}>
                <Image source={{ uri: this.state.miaomiaoUri }} style={{
                  width: screenWidth * 0.2, height: screenHeight * 0.5,
                }} resizeMode='stretch' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ name: '火花', color: '#f00' })} style={[styles.selectCard, { width: screenWidth * 0.2, height: screenHeight * 0.5, borderWidth: this.state.name === '火花' ? 1 : 0, borderColor: '#f00' }]}>
                <Image resizeMode='stretch' style={{
                  width: screenWidth * 0.2, height: screenHeight * 0.5
                }} source={{ uri: this.state.huohuaUri }} resizeMode='cover' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ name: '水蓝蓝', color: '#00f' })} style={[styles.selectCard, { width: screenWidth * 0.2, height: screenHeight * 0.5, borderWidth: this.state.name === '水蓝蓝' ? 1 : 0, borderColor: '#00f' }]}>
                <Image style={{
                  width: screenWidth * 0.2, height: screenHeight * 0.5,
                  transform: [{ translateX: 30 }, { scaleY: 0.9 }]
                }} source={{ uri: this.state.shuilanlanUri }} resizeMode='stretch' />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: this.state.color, padding: 5, marginTop: screenHeight * 0.07 }}
              onPress={this.selectedDie}>
              <Text style={styles.title}>就决定是你了</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Overlay>
      </View>
    )
  }
  selectedDie = async () => {
    let spirit = []
    let spiritObj = {
      name: this.state.name,
      uri: this.state.name === '喵喵' ?
        this.state.miaomiaoUri :
        (this.state.name === '火花' ?
        this.state.huohuaUri :
        this.state.shuilanlanUri)
    }
    spirit.push(spiritObj)
    await AsyncStorage.setItem('spirit', JSON.stringify(spirit))

    this.props.selectedSpirit(this.state.name, this.state.name === '喵喵' ? this.state.miaomiaoUri : (this.state.name === '火花' ? this.state.huohuaUri : this.state.shuilanlanUri))
  }
  // selectedDie = async () => {
  //   await AsyncStorage.setItem('spirit', this.state.name)
  //   await AsyncStorage.setItem('spiritUri',this.state.name === '喵喵' ? this.state.miaomiaoUri : (this.state.name === '火花' ? this.state.huohuaUri : this.state.shuilanlanUri))

  //   this.props.selectedSpirit(this.state.name, this.state.name === '喵喵' ? this.state.miaomiaoUri : (this.state.name === '火花' ? this.state.huohuaUri : this.state.shuilanlanUri))
  // }
}
const styles = StyleSheet.create({
  selectCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fffae5'
  }
})