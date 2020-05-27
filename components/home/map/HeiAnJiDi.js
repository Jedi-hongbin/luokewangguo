import React, { Component } from 'react'
import { Text, TouchableOpacity, Alert, View, Image, StyleSheet, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux'
import InfoToast from '../../InfoToast'

class HeiAnJiDi extends Component {
  state = {
    gif: require('../../../assets/image/heianjidi.gif'),
    opacity: new Animated.Value(1),
    value:1,
    display:{}
  }
  componentDidMount() {
  }
  time = () => {
    //防止页面display ： none不显示但是计时器还在运行
    let time=null
    if (this.props.style.display === 'none') {
      clearInterval(time)
      time = null
    }else {
      time = setInterval(()=>{
        this.setState({value: this.state.value === 1 ? 0 : 1},() => {
          this.fade(this.state.value)
        })
      },3000)
    }
  }
  componentWillUnmount () {
    console.log('w')
  }
  fade = (toValue) =>{
    Animated.timing(this.state.opacity,{
      toValue,
      duration: 2000,
      useNativeDriver: false
    }).start()
  }
  render() {
    console.log(this.props)
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View style={[styles.wrapper,this.props.style]}>
        {/* boss张 */}
        <TouchableOpacity
          onPress={this.pkBossZhang}
          style={[styles.boss, { marginLeft: screenWidth * 0.75, marginTop: screenHeight * 0.4 }]}>
          <Image style={{ width: 120, height: 180 }} source={require('../../../assets/image/bosszhang.png')} resizeMode='contain' />
          <Animated.View style={{opacity: this.state.opacity,position: 'absolute'}}>
            <InfoToast style={{transform:[{translateY: 30}]}} infoText={this.props.battleResult} />
          </Animated.View>
        </TouchableOpacity>
        <Image style={[styles.bgImg, { top: screenHeight * -0.13, width: screenWidth, height: screenHeight + 20 }]} resizeMode='stretch' resizeMethod='scale' source={this.state.gif} />
      </View>
    )
  }
  pkBossZhang = () => {
    Alert.alert('提示', '确定要挑战老张', [
      { text: '不了不了' },
      { text: '我再准备下' },
      {
        text: '干就完了', onPress: () => {
          this.props.navigation.navigate('pk', {
            spirit: this.props.spirit,
            spiritUri: this.props.spiritUri,
            bgImg: this.state.gif,
            userName: this.props.userName,
            bossName: '小老八',
            bossUri: require('../../../assets/image/bosszhang.png'),
            wuQiUri: require('../../../assets/image/bosszhangattack.png')
          })
        }
      },
    ])
  }
}
function mapStateToProps(state) {
  return {battleResult: state.battleResult}
}
export default connect(
  mapStateToProps
)(HeiAnJiDi)
const styles = StyleSheet.create({
  boss: {
    width: 80,
    height: 180,
  },
  bgImg: {
    position: 'absolute',
    zIndex: -100,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -200
  }
})
