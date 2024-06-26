import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Colors from '../constants/Colors'
import { PropsWithChildren } from 'react'
export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color:  Colors.light.background,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})