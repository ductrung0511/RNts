import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Import axios for making HTTP requests
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useRef } from 'react';
import Tesseract from 'tesseract.js';
import { useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import * as FileSystem from 'expo-file-system';
import { useUploadImage } from '@/src/api/orders';

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | null>('');
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [textResult, setTextResult] = useState('');
    const workerRef = useRef<Tesseract.Worker | null>(null);
    
    // useEffect(() => {
    //     workerRef.current = createWorker({
    //       logger: message => {
    //         if ('progress' in message) {
    //           setProgress(message.progress);
    //           setProgressLabel(message.progress == 1 ? 'Done' : message.status);
    //         }
    //       }
    //     });
    //     return () => {
    //       workerRef.current?.terminate();
    //       workerRef.current = null;
    //     }
    //   }, []);
    // const handleExtract = async () => {
    
    //     const worker = workerRef.current!;
    //     await worker.load();
        
    //     const response = await worker.recognize(image!);
    //     setTextResult(response.data.text);
    //     console.log(response.data);
    //   };

    const handleClick = () => {
    
    
    const dataUrl = imageFile;
  
    Tesseract.recognize(
      dataUrl,'eng',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      let confidence = result.confidence
      // Get full output
      let text = result.text
  
      setText(text);
      // setPin(patterns);
    })
  }
    const handleClick2 = async ()=>{
        if (!image) {
            console.log('Please select an image first.');
            return;
        }
        
        const imageData = await useUploadImage(imageFile);
        const imageUrl = imageData.url;
        console.log(imageData, 'Uploaded image URL:', imageUrl);
        

        try {
            const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
            const response = await axios.post(
                'https://api.ocr.space/parse/image',
                { 
                    base64Image: base64,
                    apikey: 'K83422568388957',
                    language: 'eng',
                    filetype: 'JPG',

                 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'filetype': 'JPG',

                        'X-Api-Key': 'K83422568388957', // Replace with your actual API key
                    },
                }
            );
            console.log('response', response.data)

            setTextResult(response.data.text);
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to recognize text.', error.message);
        }
    };

    // function captureTradeLicenseImage() {
    //     let options = {
    //         maxHeight: 250,
    //         maxWidth: 350,
    //         includeBase64: true //add this in the option to include base64 value in the response
    //     }
    //     ImagePicker.launchCamera(options, (response)  => {
    //         console.log('Response = ', response)
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker')
    //         }
    //         else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error)
    //         }
    //         else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton)
    //         }
    //         else if (response.fileSize > 5242880) {
    //             Alert.alert(
    //                 "Nilamhut Say\'s",
    //                 "Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry",
    //                 [
    //                     { text: "OK", onPress: () => console.log('ok Pressed') }
    //                 ],
    //                 { cancelable: false }
    //             )
    //         }
    //         else {
    //             this.setState({tradeLicenseImageData: response.base64}) //access like this
    //         }
    //     })
    // }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            try {
                const base64 = await FileSystem.readAsStringAsync( result.assets[0].uri ,{ encoding: 'base64' });
                 // Log the base64 string to the console
                setImageFile(base64);
              } catch (error) {
                console.error(error);
              }
            
            // console.log( typeof result.assets, typeof result.assets.values, result.assets.base);
            
        }
    };
    const readAsBase64 = async (uri : string) => {
        try {
          const base64 = await FileSystem.readAsStringAsync(uri,{ encoding: 'base64' });
          console.log(base64); // Log the base64 string to the console
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 7 }}>
            <Image source={{ uri: image || defaultPizzaImage }} style={{ width: '50%', aspectRatio: 1, alignSelf: 'center' }}/>
            <Text onPress={pickImage} style={{ fontSize: 10, color: 'white', marginVertical: 10, alignSelf: 'center', fontWeight: 'bold' }}>Select Image</Text>
            <Button title='Convert' onPress={()=>{handleClick2()}} />
            <Text onPress={pickImage} style={{ fontSize: 10, color: 'white', marginVertical: 10, alignSelf: 'center', fontWeight: 'bold' }}>
                {textResult}
            </Text>

            
        </ScrollView>
    );
};

export default CreateProductScreen;
