import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default class TabBar extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.border,this.props.wrapStyle]}>
        <Image style={[styles.Img, this.props.style]} source={this.props.uri} resizeMode='cover' />
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  Img: {
    flex: 1,
  },
  border: {
    width: 70,
    height: 50,
    bottom: 15,
    overflow: 'hidden'
  }
})
