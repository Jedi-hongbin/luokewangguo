import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { Snackbar } from 'react-native-paper'
import {
  NoticeBar,
} from '@ant-design/react-native';
import TabBar from './TabBar'
import ChengBao from './map/ChengBao'
import YanHui from './map/YanHui'
import Popup from './Popup'
import Spirit from './bottomBar/Spirit'
import Map from './Map'
import RenYuWan from './map/RenYuWan'
import WeiLian from './map/WeiLian'
import HeiAnJiDi from './map/HeiAnJiDi'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
class home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '王国城堡',
      load: false,
      visible: false,
      spirit: '',
      spiritUri: '',
      snackbar: false,
      noticeBarRight: new Animated.Value(-600),
      bottomBar:'',
    }
  }
  
  componentDidMount() {
    this.checkSpirit()
  }
  changeFirstSpirit = (spirit,spiritUri) => {
    this.setState({
      spirit,
      spiritUri
    })
  }
  render() {
    // let all = AsyncStorage.getItem('spirit')
    // all.then(all => console.log(JSON.parse(all)))
    // console.log(this.props)
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const { address, visible, snackbar, bottomBar, spiritUri, spirit } = this.state
    return (
      <View style={styles.wrapper}>
        {/* 第一次进选择宠物页 */}
        <Popup visible={visible} selectedSpirit={this.selectedSpirit} />
        {/* 顶部地图 */}
        <TouchableOpacity onPress={() => this.goToWhere('地图',0)} style={styles.map}>
          <Image style={{ flex: 1 }} source={require('../../assets/image/map.png')} />
          <Text style={[styles.mapName,{ fontSize: screenWidth*0.022, top:screenWidth *0.024, left:77 }]}>{address}</Text>
        </TouchableOpacity>
        {/* 页面跳转加载动画 */}
        <ActivityIndicator animating={this.state.load} size='large' style={styles.loading} color='rgba(50,143,221,0.8)' />
        {/* 底部导航栏 */}
        <LinearGradient
          colors={[ 'rgb(122,189,247)' ,'rgba(50,43,221,0.8)']}
          locations={[0.1, 0.9]}
          style={[styles.buttonBar, { width: screenWidth }]}>
          <TabBar wrapStyle={{ width: 80, height: 80, bottom: 40 }} style={{ transform: [{ translateX: 0 }] }} uri={require('../../assets/image/chongwuniao.png')} />
          <TabBar style={{ transform: [{ translateX: 2 }] }} uri={require('../../assets/image/tujian.png')} />
          <TabBar uri={require('../../assets/image/shezhi.png')} />
          <TabBar uri={require('../../assets/image/mofa.png')} />
          <TabBar style={{ transform: [{ translateX: -10 }] }} uri={require('../../assets/image/beibao.png')} />
          <TabBar onPress={() =>this.buttonMenu('宠物')} uri={require('../../assets/image/qiu.png')} />
          <TabBar style={{ transform: [{ translateX: -25 }] }} uri={require('../../assets/image/home.png')} />
          <TabBar wrapStyle={{ width: 80, height: 80, bottom: 40, transform: [{ translateX: -10 }] }} style={{ transform: [{ translateX: -45 }] }} uri={require('../../assets/image/shopping.png')} />
        </LinearGradient>
        {/* 城堡页 */}
        <View style={{ flex: 1, display: this.state.address == '王国城堡' ? 'flex' : 'none' }}>
          <ChengBao goToWhere={this.goToWhere} />
        </View>
        {/* 城堡大厅页 */}
        <View style={{ flex: 1, display: this.state.address == '城堡大厅' ? 'flex' : 'none' }}>
          <YanHui goToWhere={this.goToWhere} />
        </View>
        {/* 人鱼湾 */}
        <View style={{ flex: 1, display: this.state.address == '人鱼湾' ? 'flex' : 'none' }}>
          <RenYuWan userName={this.props.route.params.name} spirit={spirit} spiritUri={spiritUri} {...this.props} goToWhere={this.goToWhere} />
        </View>
        {/* 威廉古堡 */}
        <WeiLian style={{display: this.state.address == '威廉古堡' ? 'flex' : 'none'}} spirit={spirit} spiritUri={spiritUri} {...this.props} goToWhere={this.goToWhere} />
        {/* 黑暗基地 */}
          <HeiAnJiDi style={{display: this.state.address == '黑暗基地' ? 'flex' : 'none'}} userName={this.props.route.params.name} spirit={spirit} spiritUri={spiritUri} {...this.props} goToWhere={this.goToWhere} />
        {/* 地图展开页 */}
        <View style={{ flex: 1, display: this.state.address == '地图' ? 'flex' : 'none' }}>
          <Map goToWhere={this.goToWhere} />
        </View>
        {/* 选择宠物弹窗 */}
        <Snackbar
          visible={this.props.snackbar}
          onDismiss={() => this.props.showSnackbar('hidden') }
          action={{
            label: '点击查看',
            onPress: () => {
              this.buttonMenu('宠物')
            },
          }}
          style={{ marginBottom: 260 }}
        >
          <Text>{this.props.addSpirit || this.state.spirit}放入背包</Text>
        </Snackbar>
        {/* 第二次进入欢迎横幅 */}
        <Animated.View style={{right: this.state.noticeBarRight}}>
          <NoticeBar style={{top: -300, width: 300, borderRadius: 10 }} icon={<Icon name='commenting' color='#f77' size={25} />}>
            <Text>欢迎回来 {this.props.route.params.name}</Text>
          </NoticeBar>
        </Animated.View>
        {/* 宠物 */}
        <Overlay
          backdropStyle={{backgroundColor:'transparent'}}
          onBackdropPress={()=>this.setState({bottomBar: ''})}
          overlayStyle={{padding: 0, width: screenWidth * 0.8, height: screenHeight * 0.7, elevation: 10 }}
          isVisible={bottomBar === '宠物'}>
          <Spirit changeFirstSpirit={this.changeFirstSpirit} spirit={this.state.spirit} spiritUri={spiritUri} />
        </Overlay>
      </View>
    )
  }
  buttonMenu = (bottomBar) => {
    this.setState({bottomBar})
  }
  checkSpirit = async () => {
    const value = await AsyncStorage.getItem('spirit')

    if (!value) {
      this.setState({ visible: true })
    } else {
      Animated.timing(this.state.noticeBarRight,{
        toValue: 600,
        duration: 5000,
        useNativeDriver: false
      }).start()
      const spirits = JSON.parse(value)
      this.setState({spirit: spirits[0].name, spiritUri: spirits[0].uri})
    }
  }
  goToWhere = (address, time) => {
    this.setState({ load: true })
    setTimeout(() => {
      this.setState({ address, load: false })
    }, time)
  }
  selectedSpirit = (spirit,spiritUri) => {
    this.setState({ 
      spirit, 
      spiritUri, 
      visible: false
    },() =>{
        this.props.showSnackbar('show')
      })
  }
}
function mapStateToProps (state) {
  return {
    addSpirit: state.addSpirit,
    snackbar: state.snackbar
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showSnackbar : (type) => dispatch({
      type
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(home)
const styles = StyleSheet.create({
  mapName: {  
    position: 'absolute',
    backgroundColor: 'rgb(40,100,178)',
    color: '#fff',
    fontWeight: 'bold',
    padding: 2,
    paddingRight: 4,
    minWidth: 78
  },
  map: {
    position: 'absolute',
    top: 0,
    zIndex: 0
  },
  loading: {
    position: 'absolute'
  },
  buttonBar: {
    height: 40,
    backgroundColor: 'rgba(50,100,200,0.7)',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 0
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})