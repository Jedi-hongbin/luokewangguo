import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import SkillCard from '../SkillCard'
import { Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

export default class Spirit extends Component {
  state = {
    snackbar: false,
    skillName: '',
    skillInfo: '',
    spiritList: [],
    spiritName: '',
    spiritUri:'',
    spiritIndex: 0
  }
  componentDidMount () {
    let all = AsyncStorage.getItem('spirit')
    all.then(all => {
      this.setState({ spiritList: JSON.parse(all)},() => {
        this.setState({
          spiritName:this.state.spiritList[0].name,
          spiritUri:this.state.spiritList[0].uri,
        })
      })
    })
  }

  render() {
    const { spirit, spiritUri } = this.props
    const { snackbar, skillInfo, skillName, spiritList, spiritName } = this.state
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height

    return (
      <View style={{ flex: 1, overflow: 'hidden', paddingBottom: 0.1 }}>
        <LinearGradient
          style={{ flex: 1, flexDirection: 'row', borderRadius: 4, elevation: 5 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#fff', '#54f']}>
          <View style={styles.left}>
            <Icon style={{ position: 'absolute', top: 20, left: 20 }} name={spirit === '水蓝蓝' ? 'venus' : 'mars'} size={23} color={spirit === '水蓝蓝' ? '#faa' : '#0af'} />
            <Image style={styles.img} resizeMode='contain' source={{ uri: this.state.spiritUri || spiritUri }} />
            <View style={styles.spiritInfo}>
              <Text style={{ fontWeight: 'bold' }}>宠物信息</Text>
              <Text>名称 {spiritName || this.props.spirit}</Text>
              <Text>性格： 活泼 {this.props.spirit === '喵喵' ? '胆小' : this.props.spirit === '水蓝蓝' ? '安静' : '勇敢'}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.top}>
              {spiritList.map((x, i) =>
                <TouchableOpacity 
                  onPress={() => this.selectSpirit(x,i)}
                  key={i} style={styles.card}>
                  <Image style={[styles.Imgs, {
                  }]} resizeMode='center' source={{ uri: x.uri }} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.main}>
              <View style={styles.skillCardTop}>
                <SkillCard name='🤮泡泡' power='40' info='向对方🤮泡泡' onPress={() => this.setState({ skillName: '🤮泡泡', skillInfo: '向对方🤮泡泡', snackbar: !this.state.snackbar })} />
                <SkillCard name='扔汉堡' power='--' info='向对方扔老八秘...' onPress={() => this.setState({ skillName: '扔汉堡', skillInfo: '向对方扔老八秘制小汉堡，有可能一击毙命，也可能奄奄一息，还可能不为所动', snackbar: !this.state.snackbar })} />
                <SkillCard name='吃汉堡' power='--' info='吃个小汉堡，降..' onPress={() => this.setState({ skillName: '吃汉堡', skillInfo: '吃个小汉堡，降低自己少量ph，以换取大量物理攻击和法术强度提升', snackbar: !this.state.snackbar })} />
                <SkillCard />
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress = {this.firstSelect}
                style={styles.bottomSelect}>
                <Image style={{ flex: 1 }} source={require('../../../assets/image/shouxuan.png')} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomSelect}>
                <Image style={{ flex: 1 }} source={require('../../../assets/image/ruku.png')} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomSelect}>
                <Image style={{ flex: 1 }} source={require('../../../assets/image/duanlian.png')} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomSelect}>
                <Image style={{ flex: 1 }} source={require('../../../assets/image/huifu.png')} resizeMode='contain' />
              </TouchableOpacity>
            </View>
          </View>
          <Snackbar
            visible={snackbar}
            onDismiss={() => this.setState({ snackbar: !this.state.snackbar })}
            action={{
              label: '知道了',
              onPress: () => {
                // this.buttonMenu('宠物')
              },
            }}
            style={{ top: -screenHeight * 0.5 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{skillName + ' '} </Text>
            <Text>{skillInfo}</Text>
          </Snackbar>
        </LinearGradient>
      </View>
    )
  }
  firstSelect = () => {
    let newList = this.state.spiritList
    newList.splice(this.state.spiritIndex,1)
    let firstSpirit = {name: this.state.spiritName, uri: this.state.spiritUri}
    newList.unshift(firstSpirit)
    this.setState({spiritList: newList})
    this.props.changeFirstSpirit(this.state.spirit,this.state.spiritUri)
    AsyncStorage.setItem('spirit',JSON.stringify(this.state.spiritList))
  }
  selectSpirit = (spirit,index) => {
    this.setState({
      spiritName: spirit.name,
      spiritUri: spirit.uri,
      spiritIndex: index
    })
  }
}
const styles = StyleSheet.create({
  bottomSelect: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillCardTop: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  main: {
    flex: 2,
    flexDirection: 'row'
  },
  footer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
  Imgs: {
    flex: 1,
    width: 60,
    height: 60,
  },
  card: {
    width: 60,
    height: 60,
    backgroundColor: '#aaf',
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: 10,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#fffae5',
    flexShrink: 1
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spiritInfo: {
    // backgroundColor: '#faf',
    flex: 1,
    paddingLeft: 10
  },
  img: {
    flex: 2,
    // backgroundColor: '#acc',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 155
  },
  left: {
    flex: 2,
  },
  right: {
    // backgroundColor: '#ffa',
    flex: 3
  }
})
