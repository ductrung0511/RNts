import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Colors from '../constants/Colors'
import { PropsWithChildren } from 'react'
export default function Background({ children } : PropsWithChildren) {
  return (
    <ImageBackground
      source={{uri: "https://marketplace.canva.com/EAFF2rzzkDY/1/0/1131w/canva-clean-brown-paper-texture-background-page-border-wXfQfy5lra4.jpg"}}//require('@/assets/background_dot.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})