import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [text, setText] = useState("");

  const [eImage, setEImage] = useState<string|null>(null)

  const handleSubmitImage= async ( imageUri : string) => {

    const base64 = await FileSystem.readAsStringAsync( imageUri ,{ encoding: 'base64' });
    const url = "https://api.imgbb.com/1/upload?key=b71665dd7cb0b8b3b70af937933649f5";
    const data = new FormData();
    data.append("key", "b71665dd7cb0b8b3b70af937933649f5");
    data.append("image", base64);
    // if(!image && !["image/tiff", "image/webp", "image/svg+xml", "image/bmp", "image/jpeg", "image/png", "image/gif"].includes(image.type))
    // {
    //   return;
    // }
    try{
      const response = await fetch(url, {
        method: "POST",
        body: data,    
      })
      const jsonData = await response.json();
      if (!response.ok) {
        console.log(jsonData)
        throw new Error("Network response was not ok");
      }
      else if(response.ok){
        console.log(jsonData.data.display_url, ' your url returned')
        setEImage( jsonData.data.display_url)
      }
    }
    catch(error){
      console.log("error", error)
  
    }
  
    
    
  }


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
    //   handleClick(result.assets[0].uri);
      handleSubmitImage(result.assets[0].uri);
    }
  };

  const handleClick = async () => {

    if (!eImage) {
        console.log(eImage)
        Alert.alert('Error', 'Please provide a valid image URL');
        return;
      }
    try {
        const response = await axios.get(
            `https://api.ocr.space/parse/imageurl?apikey=K83422568388957&url=${eImage}`
          );
    
        if (response.data.ParsedResults && response.data.ParsedResults.length > 0) {

        (response.data.ParsedResults[0].ParsedText);
        setText(response.data.ParsedResults[0].ParsedText);
        console.log(response.data.ParsedResults[0].ParsedText, 'text');

        } else {
        console.log('Error', 'Failed to recognize text');
        }
        console.log(response.data)
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
      <Button title="Convert to text" onPress={() => handleClick()} />
      {text ? (
        <View style={styles.textBox}>
          <Text style={{color:'white'}}>{text}</Text>
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
