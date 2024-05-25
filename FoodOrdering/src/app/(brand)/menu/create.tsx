import { Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Button from '@/src/components/Button'
import { Image } from 'react-native'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { Alert } from 'react-native'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products'
import { ScrollView } from 'react-native'

const  CreateProductScreen = () =>  {
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string >('')
    const [category, setCategory] = useState<string >('')
    const [brandName, setBrandName] = useState<string>('')
    const [description, setDescription] = useState<string >('')

    const [error, setError] = useState<string | null>('')
    const [image, setImage] = useState<string | null >('');
    const {id : idString} = useLocalSearchParams();
    console.log(idString);
    const id = parseFloat( typeof idString ==='string' ? idString: idString?.[0]);
    const isUpdating = !!id;
    // if(isUpdating){}
    const {data: updatingProduct, error: errorFetchProduct} = useProduct(id);
    useEffect(()=>{
        if(!errorFetchProduct && updatingProduct){
            setName(updatingProduct.name? updatingProduct.name: '' )
            setPrice(updatingProduct.unit_price?.toString()? updatingProduct.unit_price.toString() :'')
            setCategory(updatingProduct.category?  updatingProduct.category : '')
            setBrandName(updatingProduct.brand_name? updatingProduct.brand_name : '')
            setDescription(updatingProduct?.description? updatingProduct?.description: '')
            setImage(updatingProduct.image_url)
        }

    },[updatingProduct])



    const { mutate: insertNewProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct()
    const {mutate: deleteProduct} = useDeleteProduct()


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const resetFields = () =>{
        setName('');
        setPrice('');
    }
    const validateInput = () => {
        if(!name) {
            setError('name is required');
            return false;
        }
        if(!price) {
            setError('price is required');
            return false;
        }
        if (isNaN(parseFloat(price))){
            setError('price is not a number!')
            return false;
        }
        return true;
    }

    const onCreate = () => {
        if(validateInput()){
            console.warn( isUpdating?  "Updating Product .. ":  "Creating Product");
            insertNewProduct(
            {
                name,
                unit_price: parseFloat(price), 
                image_url : image,
                category: category,
                brand_name: brandName,
                description: description, 
            },
            {
                onSuccess: () => {
                    resetFields();
                    setError('');
                    router.back();
                }
            }

            )
            if(error) console.log(error);
        }
        else{
            console.warn(error);
        }
    }
    const   onUpdateCreate = ( ) =>{
        if(validateInput()){
            console.warn( isUpdating?  "Updating Product .. ":  "Creating Product");
            updateProduct(
                {   
                    id,
                    name,
                    unit_price: parseFloat(price), 
                    image_url : image,
                    category: category,
                    brand_name: brandName,
                    description: description, 
                } as any,
                {
                    onSuccess: () => {
                        resetFields();
                        console.warn( "Updated Prodcut");
                        setError('');
                        router.back();
                    },
                    onError: (error) => {
                        console.warn(error)
                    }
                    
                }
            );
            if(error) console.log(error);
        }
        else{
            console.warn(error);
        }
        

    }
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product!', [
            {
                text: 'Cancel'
            }, 
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ])

    }
    const onDelete = () => {
        console.warn('Delete on going!')
        deleteProduct(id, {onSuccess: ()=>{
            setError('');
            router.replace('/(brand)');
        }})

    }
    return (
    //   <View style={styles.container}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 7 }}>
        <Stack.Screen options={{title: isUpdating? "Updating Product" : 'Create Product'}}/>
        <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
        <Text onPress={pickImage} style={styles.textButton}> Select Image</Text>
        <Text style={styles.label}>Name</Text>
        {/* OnChangeText? */}
        <TextInput value={name} onChangeText={setName} placeholder='name' style={styles.input}/> 
        <Text  style={styles.label}> Price ($) </Text>
        <TextInput value={price} onChangeText={setPrice} placeholder='9.99' style={styles.input} keyboardType='numeric'/>
        
        <Text  style={styles.label}> Category </Text>
        <TextInput value={category} onChangeText={setCategory} placeholder='Rice' style={styles.input}/>
        
        <Text  style={styles.label}> Brand Name </Text>
        <TextInput value={brandName} onChangeText={setBrandName} placeholder='Cơm Gà E24' style={styles.input}/>
        
        <Text  style={styles.label}> Description </Text>
        <TextInput value={description} onChangeText={setDescription} placeholder='MM.. Description' style={styles.input}/>
        
        <Text style={styles.errorInput}> {error} </Text>
        <Button text={isUpdating ?  "Update" : "Create" } onPress={isUpdating?onUpdateCreate: onCreate}/>
        {isUpdating  && <Text onPress={confirmDelete} style={styles.textButton}> Delete </Text>}
    </ScrollView>
    )
}

export default CreateProductScreen 

const styles = StyleSheet.create({
    container: {
         
        justifyContent: 'center',
        padding: 10,
        overflow: 'scroll',
    },
    label:{
        color: 'white',
        fontSize: 20,
        fontWeight: '200',
        marginBottom: 4,
        marginTop: 20,
    },
    input:{

        backgroundColor: 'white',
        padding: 10, 
        borderRadius: 4,

    },
    errorInput:{
        color: 'red',
        fontWeight: '100',
        fontSize: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1, 
        alignSelf: 'center',

    },
    textButton: {
        fontSize: 10, 
        color: Colors.light.tint,
        marginVertical: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
    }


})