import React, { useEffect, useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import { Image, Pressable } from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { StyleSheet } from 'react-native';
import Button from '@/src/components/Button';
import { CartItem, PizzaSize, Product } from '@/src/types';
import { useCart } from '@/src/provider/CartProvider';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import { ActivityIndicator } from 'react-native-paper';

const sizes: PizzaSize[] = [ 'S', 'M', 'L', 'XL'];

function product() {
  const {id : idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString ==='string'? idString: idString[0])
  const {data: product, error, isLoading} = useProduct(id);

  const {addItem, items, updateQuantity} = useCart();
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const addToCart = async () => {
    if (!product) return;
    // Find the product in the cartItems array
    console.warn('add to cart');
    console.log(product);
    addItem(product, selectedSize);
    router.push('/cart');
  };
   
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return(
      <Text>error loading products</Text>
    )
  }

  
  return (
    <View style={styles.container}>
      <Stack.Screen
                options={{
                    title: 'Menu ID',
                    headerRight: () => (
                        <Link href={`/(brand)/menu/create?id=${product.id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                            <FontAwesome
                                name="pencil"
                                size={25}
                                color={Colors.dark.tint}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                            )}
                        </Pressable>
                        </Link>
                    ),
                }}
                />
      {/* <Stack.Screen  options={{title: product.name }}/> */}
      <Image source={{uri: product.image_url || defaultPizzaImage}} style={styles.image}/>

      <Text style={{color: 'black'}}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((item)=>
          <Pressable onPress={()=>{setSelectedSize(item)}}  key={item} style={[styles.size, {backgroundColor: item === selectedSize ? 'gray' : 'gainsboro'}]}>
            <Text style={styles.sizeText}>{item}</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.price}>${product?.unit_price}</Text>
      <Button onPress={addToCart} text='Add to cart'/>
      
    </View>
  )
}

export default product


const styles = StyleSheet.create({
  image: {
    backgroundColor: 'white',
    width: '100%',
    aspectRatio: 1,
  },
  container:
  {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 'auto',
  },
  size:{
    backgroundColor: 'gainsboro',
    width: 40,
    aspectRatio: 1, 
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText:{
    fontSize: 20,
    fontWeight : '500',
  },
  sizes:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  
  })