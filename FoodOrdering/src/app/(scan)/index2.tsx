import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Tesseract from 'tesseract.js';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [text, setText] = useState("");

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      handleClick(result.assets[0].uri);
    }
  };

  const handleClick = async (uri) => {
    try {
      const result = await Tesseract.recognize(
        uri,
        'eng',
        {
          logger: m => console.log(m),
        }
      );
      setText(result.data.text);
      console.log(result.data.text,'text result ....')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick an image from camera roll" onPress={handleImagePick} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <Button title="Convert to text" onPress={() => handleClick(imageUri)} />
      {text ? (
        <View style={styles.textBox}>
          <Text>{text}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  textBox: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default App;
