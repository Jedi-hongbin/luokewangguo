import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class InfoToast extends Component {
  render () {
    const { infoText, style } = this.props
    return (
      <View style={[styles.wrap, style]}>
        <View style={styles.container}>
          <Text style={styles.Text}>{infoText}</Text>
        </View>
        <Text style={styles.mark} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  mark: {
    flex: 1,
    width: 0,
    borderTopWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: "transparent",
    borderTopColor: "rgba(255,255,255,0.9)",
    transform: [{translateX: 10}]
  },
  Text: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 30
  },
  wrap: {
    width: 100,
    height: 50,
    position: 'absolute'
  }
})