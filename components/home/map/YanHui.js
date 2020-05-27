import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Animated } from 'react-native'
import { Button, Snackbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class YanHui extends Component {
  state = {
    opacity: new Animated.Value(1),
    visible: false,
    isShow: true
  }

  componentDidMount() {
    setInterval(() => {
      this.fade(this.state.isShow ? 0 : 1)
    }, 3000)
  }

  _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

  _onDismissSnackBar = () => this.setState({ visible: false });
  render() {
    const { visible } = this.state;
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View style={[styles.wrapper, { width: screenWidth, height: screenHeight - 40 }]}>
        <Animated.Text onPress={() => this.props.goToWhere('王国城堡', 500)} style={[styles.title, { opacity: this.state.opacity }]}>王国城堡</Animated.Text>
        <Button
          style={{ marginLeft: 250, marginTop: 20, zIndex: -10 }}
          onPress={this._onToggleSnackBar}
        >
          <Icon name='cutlery' size={30} />
          {visible ? '好样的' : '吃个汉堡'}
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={this._onDismissSnackBar}
          action={{
            label: '吃完了',
            onPress: () => {
              // Do something
            },
          }}
          style={{ marginBottom: screenWidth*0.28 }}
        >
          <Text>香喷喷</Text>
        </Snackbar>
        <Image style={[styles.bgImg, { width: screenWidth, height: screenHeight - 40 }]} resizeMode='stretch' resizeMethod='scale' source={require('../../../assets/image/yanhuidating.png')} />
      </View>
    )
  }
  fade = (toValue) => {
    Animated.timing(this.state.opacity, {
      toValue,
      duration: 1000,
      useNativeDriver: false
    }).start()
    this.setState({ isShow: !this.state.isShow })
  }
}
const styles = StyleSheet.create({
  title: {
    transform: [{ translateX: -12 }],
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    paddingTop: 0,
    paddingBottom: 40,
    paddingLeft: 20,
  },
  bgImg: {
    position: 'absolute',
    zIndex: -100,
    top: 0
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ddd',
    zIndex: -100
  }
})
