import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

interface TextInputProps {
    errorText?: string; // Optional error text
    description?: string; // Optional description
    [key: string]: any; // Allows passing any other props
  }
export default function TextInput({ errorText , description, ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor= 'black'
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
  },
  description: {
    fontSize: 13,
    color: 'black',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: '',
    paddingTop: 8,
  },
})