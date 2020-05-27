import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { defaultProps } from '@ant-design/react-native/lib/search-bar/PropsType'

export default class SkillCard extends Component {
  static defaultProps = {
    name: '--',
    power: '--',
    info : '--',
    styles: {}
  }
  render(){
    const { name, power, info, onPress } = this.props
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <View>
        <TouchableOpacity style={[styles.skillInfo, { width:screenWidth*0.2,height:screenHeight*0.17},this.props.styles]} onPress={onPress}>
          <Text style={{fontSize: screenWidth*0.015}}>{name}</Text>
          <View style={styles.hr} />
          <Text style={{fontSize: screenWidth*0.015}}>威力： {power}</Text>
          <Text style={{fontSize: screenWidth*0.015}}>介绍： {info}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  hr: {
    borderWidth: 0.5,
    borderStyle: 'dotted',
    borderRadius: 0.5,
    borderColor: '#555',
    marginLeft: 5,
    marginRight: 5
  },
  skillInfo: {
    backgroundColor: 'rgba(50,50,178,0.1)',
    borderWidth: 2,
    borderColor: '#33f',
    marginTop: 5,
    borderRadius: 10,
    paddingLeft: 5,
    overflow: 'hidden',
  }
})