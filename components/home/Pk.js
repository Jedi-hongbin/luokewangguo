import React, { Component } from 'react'
import { Text, View, Dimensions, Animated, Image, StyleSheet, Vibration, TouchableOpacity } from 'react-native'
import { Overlay, Button } from 'react-native-elements'
import SkillCard from '../home/SkillCard'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'

class Pk extends Component {
  state = {
    opacity: new Animated.Value(1),
    hanBaoLeft: new Animated.Value(80),
    bossHanBao: new Animated.Value(50),
    mainOpacity: new Animated.Value(0),
    reduceHp: new Animated.Value(50),
    reduceHpOpacity: new Animated.Value(0),
    bossHp: new Animated.Value(0),
    bossHpText: 100,
    wiQi: require('../../assets/image/hanbao.png'),
    power: 40,
    visible: false,
    result: '恭喜你取得的胜利',
    zIndex: -1,
    bossZIndex: -1,
    battleInfo: '你的回合',
    battleInfoOpacity: new Animated.Value(0),
    spiritReduceHp: new Animated.Value(0),
    spiritReduceHpOpacity: new Animated.Value(0),
    bossHanbaoOpacity: new Animated.Value(0),
    bossRandomPower: 0,
    spiritHp: 100,
    spiritMarginRight: new Animated.Value(0),
    isOver: false,
    wiQiOpacity: new Animated.Value(1),
    bossOpacity: new Animated.Value(1),
    guluqiuOpacity: new Animated.Value(0),
    guluqiutranslate: new Animated.Value(0),
    zhuaBuResult: '抓捕失败',
    zhuabuFontSize: new Animated.Value(0),
    addHpTop: new Animated.Value(30),
    addHpOpacity: new Animated.Value(0),
    addHpNum: 0
  }
  componentDidMount() {
    this.fade()
  }
  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const { spirit, spiritUri, bgImg, userName, bossName, bossUri, wuQiUri } = this.props.route.params
    // transform使用动画
    const rotate = this.state.guluqiutranslate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '3600deg']
    });
    return (
      <View style={[styles.wrapper, { width: screenWidth, height: screenHeight }]}>
        <Animated.View style={{ flex: 1, opacity: this.state.mainOpacity, width: screenWidth, height: screenHeight }}>
          {/* 顶部区域 */}
          <View style={styles.title}>
            {/* 左侧精灵 */}
            <View style={[styles.flexItem, { justifyContent: 'flex-start' }]}>
              {/* 精灵头像 */}
              <View style={[{ width: screenWidth * 0.1, height: screenHeight * 0.2 }, styles.spiritHeaderIconContainer]}>
                <Image style={styles.spiritHeaderIcon} source={{ uri: spiritUri }} resizeMode='center' />
              </View>
              {/* 精灵血条 */}
              <Animated.View style={[styles.hpContainer, { paddingRight: this.state.spiritMarginRight, width: screenWidth * 0.38, height: screenHeight * 0.07 }]}>
                <View style={styles.HP}></View>
                <Text style={[styles.HpText, { left: screenWidth * 0.1 }]}>{this.state.spiritHp}</Text>
              </Animated.View>
            </View>
            <Text style={styles.vs}>VS</Text>
            {/* 右侧boss */}
            <View style={[styles.flexItem, { justifyContent: 'flex-end' }]}>
              {/* boss血条 */}
              <Animated.View style={[styles.hpContainer, { paddingLeft: this.state.bossHp, width: screenWidth * 0.38, height: screenHeight * 0.07 }]}>
                <View style={styles.HP}></View>
                <Text style={[styles.HpText, { right: screenWidth * 0.1 }]}>{this.state.bossHpText}</Text>
              </Animated.View>
              <View style={[{ width: screenWidth * 0.1, height: screenHeight * 0.2 }, styles.spiritHeaderIconContainer]}>
                <Image style={styles.spiritHeaderIcon} source={bossUri} resizeMode='center' />
              </View>
            </View>
          </View>
          {/* 精灵战斗区域 */}
          <View style={styles.main}>
            <View style={[styles.flexItem, { justifyContent: 'flex-start' }]}>
              <View style={[styles.container, { width: screenWidth * 0.2, height: screenHeight * 0.5 }]}>
                <Image style={[styles.transY, { width: screenWidth * 0.2, height: screenHeight * 0.5 }]} source={{ uri: spiritUri }} resizeMode='contain' />
                {/* 精灵攻击 */}
                <Animated.View style={[styles.xiaoHanBao, { left: this.state.hanBaoLeft, opacity: this.state.wiQiOpacity }]}>
                  <Image style={{ width: 70, height: 70 }} source={this.state.wuQi} resizeMode='center' />
                </Animated.View>
                <Animated.Text style={[styles.reduce, { top: this.state.spiritReduceHp, opacity: this.state.spiritReduceHpOpacity }]}>- {this.state.bossRandomPower}</Animated.Text>
                <Animated.Text style={[styles.addHp, {
                  top: this.state.addHpTop,
                  opacity: this.state.addHpOpacity
                }]}>+ {this.state.addHpNum}</Animated.Text>
              </View>
            </View>
            {/* boss */}
            <View style={[styles.flexItem, { justifyContent: 'flex-end' }]}>
              <View style={[styles.container, { width: screenWidth * 0.2, height: screenHeight * 0.5 }]}>
                <Animated.Image
                  style={[
                    {
                      width: screenWidth * 0.2,
                      height: screenHeight * 0.5,
                      opacity: this.state.bossOpacity
                    }]} source={bossUri} resizeMode='contain' />
                {/* boss攻击 */}
                <Animated.View style={[styles.xiaoHanBao, { right: this.state.bossHanBao, zIndex: this.state.bossZIndex, opacity: this.state.bossHanbaoOpacity }]}>
                  <Image style={{ width: 170, height: 170 }} source={wuQiUri} resizeMode='stretch' />
                </Animated.View>
                <Animated.Text style={[styles.reduce, { top: this.state.reduceHp, opacity: this.state.reduceHpOpacity }]}>- {this.state.power}</Animated.Text>
                <Animated.Image style={[
                  styles.zhuaBu,
                  {
                    opacity: this.state.guluqiuOpacity,
                    transform: [{ rotate: rotate }]
                  }]} source={require('../../assets/image/guluqiu.png')} resizeMode='cover' />
                <Animated.Text
                  style={[styles.zhuaBuResult, {
                    fontSize: this.state.zhuabuFontSize
                  }]}
                >{this.state.zhuaBuResult}</Animated.Text>
              </View>
            </View>
          </View>
          {/* 底部技能区域 */}
          <View style={styles.footer}>
            <SkillCard
              onPress={() => this.hanBaoAttack('qipao', 720, 2000)}
              styles={{ backgroundColor: '#ccf' }} name='🤮泡泡' power='40' info='向对方🤮泡泡' />
            <SkillCard
              onPress={() => this.hanBaoAttack('hanbao', 720, 2000)}
              styles={{ backgroundColor: '#ccf' }} name='扔汉堡' power='--' info='向对方扔老八秘...' />
            <SkillCard
              onPress={this.eatHanBao}
              styles={{ backgroundColor: '#ccf' }} name='吃汉堡' power='--' info='吃个小汉堡，降..' />
            <SkillCard styles={{ backgroundColor: '#ccf' }} />
            <TouchableOpacity
              onPress={this.zhuaBu}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/image/guluqiu.png')} resizeMode='center' />
              <Text style={{ textAlign: 'center', color: '#fff' }}>捕捉</Text>
            </TouchableOpacity>
            <View style={[styles.bottomMask, { zIndex: this.state.zIndex }]} />
          </View>
        </Animated.View>
        {/* pk开场动画 */}
        <Animated.View style={[styles.pkTitle, { width: screenWidth, height: screenHeight * 0.4, opacity: this.state.opacity }]}>
          <View style={[styles.textCon, { marginTop: screenHeight * 0.088 }]}>
            <Text style={[styles.showName, { width: screenWidth * 0.09, left: screenWidth * 0.29 }]}>{userName}</Text>
            <Text style={[styles.showName, { width: screenWidth * 0.09, left: screenWidth * 0.615 }]}>{bossName}</Text>
            <View style={styles.bossUri}>
              <Image style={{ width: 80, height: 80, left: screenWidth * 0.6 }} source={bossUri} resizeMode='center' />
            </View>
          </View>
          <Image style={[styles.pkImg, { width: screenWidth, height: screenHeight * 0.4 }]} source={require('../../assets/image/pkbg.png')} resizeMode='cover' />
        </Animated.View>
        {/* 背景蒙版 */}
        <View style={[styles.mask, { width: screenWidth, height: screenHeight }]} />
        {/* 战斗背景 */}
        <Image source={bgImg} style={[styles.bgImg, { width: screenWidth, height: screenHeight * 1.14, top: screenHeight * -0.14 }]} resizeMode='stretch' />
        {/* 战斗结束弹窗 */}
        <Overlay
          isVisible={this.state.visible}>
          <View style={{ backgroundColor: "#ccc", minWidth: 300 }}>
            <Text style={styles.result}>{this.state.result}</Text>
            <Button
              title="确定"
              onPress={() => {
                if (bossName === '小老八') {
                  this.props.checkBattleResult(this.state.result === '恭喜你取得胜利' ? 'true' : 'false')
                }
                this.props.navigation.goBack()
              }}
            />
          </View>
        </Overlay>
        {/* 提示战斗信息 */}
        <Animated.Text style={[styles.battleInfo, { opacity: this.state.battleInfoOpacity }]}>{this.state.battleInfo}</Animated.Text>
      </View>
    )
  }
  eatHanBao = () => {
    this.setState({ addHpNum: parseInt(Math.random() * 30), zIndex: 1 }, () => {
      this.opacity(this.state.addHpTop, -60, 1000)
      this.opacity(this.state.addHpOpacity, 1, 500)
      setTimeout(() => {
        this.setState({
          spiritHp: (this.state.spiritHp + this.state.addHpNum) >= 100 ? 100 : (this.state.spiritHp + this.state.addHpNum)
        },() => {
          this.opacity(this.state.addHpOpacity, 0, 0)
          this.opacity(this.state.addHpTop, 30, 0)
          this.opacity(this.state.spiritMarginRight, Dimensions.get('window').width * 0.38 * ((100 - this.state.spiritHp) * 0.01), 200)
          setTimeout(() => {
            this.bossAttack()
          }, 1000)
        })
      }, 1000)
    })
  }
  zhuaBu = () => {
    this.opacity(this.state.guluqiuOpacity, 1, 500)
    this.opacity(this.state.guluqiutranslate, 1, 3000)
    setTimeout(() => {
      this.opacity(this.state.guluqiuOpacity, 0, 500)

      if (this.state.bossHpText <= 20) {
        let spirit = AsyncStorage.getItem('spirit')
        spirit.then(list => {
          let List = JSON.parse(list)
          let zhuaBuSpirit = {
            name: this.props.route.params.bossName,
            uri: this.props.route.params.bossUri.uri,
            wuqi: this.props.route.params.wuQiUri.uri
          }
          List.push(zhuaBuSpirit)
          AsyncStorage.setItem('spirit', JSON.stringify(List))
        })
        this.props.showSnackbar('show')
        this.props.addSpirit(this.props.route.params.bossName)
        this.setState({ zhuaBuResult: '抓捕成功' }, () => {
          this.opacity(this.state.bossOpacity, 0, 0)
          this.opacity(this.state.zhuabuFontSize, 30, 1000)
          setTimeout(() => {
            this.props.navigation.goBack()
          }, 1000)
        })
      } else {
        this.setState({ zhuaBuResult: '抓捕失败,精灵逃跑' }, () => {
          this.opacity(this.state.zhuabuFontSize, 30, 1000)
          setTimeout(() => {
            this.props.navigation.goBack()
          }, 1000)
        })
      }
    }, 3000)
    setTimeout(() => {
      this.opacity(this.state.zhuabuFontSize, 0, 1000)
    }, 4000)
  }
  hanBaoAttack = (wuQiName, toValue, duration) => {
    this.setState({
      zIndex: 1
    })
    if (wuQiName === 'qipao') {
      this.setState({ wuQi: require('../../assets/image/qipao.png'), power: 40 })
    } else if (wuQiName === 'hanbao') {
      this.setState({ wuQi: require('../../assets/image/hanbao.png'), power: parseInt(Math.random() * 50) })
    }
    this.reduceHp(this.state.wiQiOpacity, 1, 0)
    Animated.timing(this.state.hanBaoLeft, {
      toValue,
      duration,
      useNativeDriver: false
    }).start(() => {
      this.opacity(this.state.reduceHpOpacity, 1, 0)
      this.reduceHp(this.state.reduceHp, -80, 1000)
      this.opacity(this.state.reduceHpOpacity, 0, 1500)
      if (this.state.bossHpText - this.state.power <= 0) {
        this.setState({ power: this.state.bossHpText, visible: true, isOver: true })
      }
      this.setState({ bossHpText: parseInt(this.state.bossHpText - this.state.power <= 0 ? 0 : this.state.bossHpText - this.state.power) }, () => {
        this.reduceHp(this.state.bossHp, Dimensions.get('window').width * 0.38 * ((100 - this.state.bossHpText) * 0.01), 1000)
      })
      // 恢复原来位置
      setTimeout(() => {
        this.reduceHp(this.state.reduceHp, 0, 0)
        this.reduceHp(this.state.hanBaoLeft, 80, 0)
        this.reduceHp(this.state.wiQiOpacity, 0, 0)
      }, 1000)
      //触发boss攻击
      if (!this.state.isOver) {
        setTimeout(() => {
          this.bossAttack()
        }, 1000)
      }
    })
  }
  bossAttack = () => {
    // this.setState({ wuQi: this.props.route.params.wuQiUri })
    this.setState({
      battleInfo: 'boss回合'
    }, () => {
      this.opacity(this.state.battleInfoOpacity, 1, 500)
      setTimeout(() => {
        if (this.props.route.params.bossName === '阿布') {
          this.opacity(this.state.bossOpacity, 0, 100)
        }
        this.opacity(this.state.bossHanbaoOpacity, 1, 0)
        this.opacity(this.state.battleInfoOpacity, 0, 500)
        this.opacity(this.state.bossHanBao, 780, 500)
        this.setState({ bossRandomPower: parseInt(Math.random() * 30) }, () => {
          if (this.state.spiritHp <= this.state.bossRandomPower) {
            this.setState({
              bossRandomPower: this.state.spiritHp, isOver: true
            })
          }
          this.setState({ spiritHp: this.state.spiritHp - this.state.bossRandomPower }, () => {
            this.opacity(this.state.spiritMarginRight, Dimensions.get('window').width * 0.38 * ((100 - this.state.spiritHp) * 0.01), 200)
          })

        })
        if (!this.state.isOver) {
          setTimeout(() => {
            this.opacity(this.state.spiritReduceHp, -80, 500)
            this.opacity(this.state.spiritReduceHpOpacity, 1, 0)
            this.setState({ bossZIndex: 10 })
            this.opacity(this.state.bossHanBao, 600, 200)
            setTimeout(() => {
              this.opacity(this.state.spiritReduceHpOpacity, 0, 0)
              this.opacity(this.state.spiritReduceHp, 0, 0)
              this.setState({ bossZIndex: 1 })
              this.opacity(this.state.bossHanBao, 780, 200)
              this.setState({ bossRandomPower: parseInt(Math.random() * 70) }, () => {
                if (this.state.spiritHp - this.state.bossRandomPower <= 0) {
                  this.setState({ bossRandomPower: this.state.spiritHp, isOver: true }, () => {
                    this.setState({ spiritHp: this.state.spiritHp - this.state.bossRandomPower }, () => {
                      this.opacity(this.state.spiritMarginRight, Dimensions.get('window').width * 0.38 * ((100 - this.state.spiritHp) * 0.01), 200)
                    })
                  })
                } else {
                  this.setState({ spiritHp: this.state.spiritHp - this.state.bossRandomPower }, () => {
                    this.opacity(this.state.spiritMarginRight, Dimensions.get('window').width * 0.38 * ((100 - this.state.spiritHp) * 0.01), 200)
                  })
                }

              })
              if (!this.state.isOver) {
                setTimeout(() => {
                  this.opacity(this.state.spiritReduceHpOpacity, 1, 0)
                  this.opacity(this.state.spiritReduceHp, -80, 500)
                  this.setState({ bossZIndex: 10 })
                  this.opacity(this.state.bossHanBao, 60, 500)
                  setTimeout(() => {
                    this.opacity(this.state.bossHanbaoOpacity, 0, 0)
                    this.opacity(this.state.spiritReduceHpOpacity, 0, 0)
                    this.opacity(this.state.battleInfoOpacity, 1, 200)
                    this.setState({ zIndex: -1, battleInfo: '你的回合' })
                    if (this.props.route.params.bossName === '阿布') {
                      this.opacity(this.state.bossOpacity, 1, 100)
                    }
                    setTimeout(() => {
                      this.opacity(this.state.battleInfoOpacity, 0, 200)
                    }, 200)
                  }, 400)
                }, 200)
              } else {
                this.setState({ visible: true, result: "惜败" })
              }
            }, 300)
          }, 500)
        } else {
          this.setState({ visible: true, result: "惜败" })
        }
      }, 500)
    })
  }
  reduceHp = (animated, toValue, duration) => {
    Animated.timing(animated, {
      toValue,
      duration,
      useNativeDriver: false
    }).start()
  }
  opacity = (animated, toValue, duration) => {
    Animated.timing(animated, {
      toValue,
      duration,
      useNativeDriver: false
    }).start()
  }
  fade = () => {
    Vibration.vibrate(400)
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false
    }).start()
    setTimeout(() => {
      Animated.timing(this.state.mainOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start(() => {
        this.opacity(this.state.battleInfoOpacity, 1, 500)
        setTimeout(() => {
          this.opacity(this.state.battleInfoOpacity, 0, 1000)
        }, 500)
      })
    }, 2000)
  }
}

const styles = StyleSheet.create({
  addHp: {
    color: '#0f0',
    fontWeight: 'bold',
    fontSize: 33,
    position: 'absolute',
    zIndex: 10,
    left: 100,
  },
  zhuaBuResult: {
    position: 'absolute',
    color: '#ccc',
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textShadowColor: '#fff',
    bottom: 0,
    right: 0
  },
  zhuaBu: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 40
  },
  battleInfo: {
    color: '#fffae5',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    // textShadowOffset: {width}
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fffae5',
    textAlign: 'center',
    lineHeight: 100
  },
  reduce: {
    position: "absolute",
    fontSize: 40,
    color: '#f00',
    fontWeight: 'bold',
    zIndex: 99,
    left: 30
  },
  xiaoHanBao: {
    width: 70,
    height: 70,
    position: 'absolute',
    zIndex: 8,
    top: 60,
  },
  bottomMask: {
    width: 1000,
    height: 200,
    position: 'absolute',
    backgroundColor: "transparent",
    top: 0,
  },
  transY: {
    transform: [{ rotateY: '180deg' }],
    zIndex: 10
  },
  container: {
    // overflow: 'hidden',
    flexDirection: 'row'
  },
  HpText: {
    position: 'absolute',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  HP: {
    flex: 1,
    backgroundColor: '#f00',
    borderRadius: 8,
    margin: 1,
    // transform: [{scaleX: 0.9}]
  },
  vs: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold'
  },
  hpContainer: {
    backgroundColor: '#5af',
    marginTop: 'auto',
    borderRadius: 7,
    overflow: 'hidden'
  },
  spiritHeaderIconContainer: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: 'rgba(50,50,200,0.7)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spiritHeaderIcon: {
    width: 80,
    height: 80,
  },
  flexItem: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 0.7,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  main: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10
  },
  footer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  bossUri: {
    position: 'absolute',
    top: -80,
    width: 80,
    height: 80
  },
  showName: {
    backgroundColor: "#2a45a1",
    lineHeight: 20,
    textAlign: 'center',
    borderRadius: 10,
    color: '#fff',
    position: 'absolute',
    height: 20,
  },
  textCon: {
    height: 19,
    flexDirection: 'row',
    position: 'relative'
  },
  pkImg: {
    position: 'absolute',
    zIndex: -1
  },
  pkTitle: {
    // backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'absolute'
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: -2
  },
  bgImg: {
    position: 'absolute',
    zIndex: -3,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    checkBattleResult: (type) => dispatch({
      type
    }),
    showSnackbar: (type) => dispatch({
      type
    }),
    addSpirit: (spiritName) => dispatch({
      type: 'ADD_SPIRIT',
      spiritName
    })
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pk)