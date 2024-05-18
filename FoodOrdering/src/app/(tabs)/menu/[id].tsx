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

type ProductListItemProps = {
  product : Product;
}
const sizes: PizzaSize[] = [ 'S', 'M', 'L', 'XL'];

function product() {
  // const  {} = useContext(CartContext);

  const {id} = useLocalSearchParams();
  const {addItem, items, updateQuantity} = useCart();
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const product = products.find((p) => p.id.toString() === id);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // useEffect(()=>{
  //       const fetchData = async () => {
  //           try {
  //             const value = await AsyncStorage.getItem('@cart'); // Replace '@storage_Key' with your actual key
  //             if (value!== null) {
  //               // Parse the value assuming it's a stringified JSON array
  //               const parsedItems: CartItem[] = JSON.parse(value);
  //               setCartItems(parsedItems);
  //             }
  //           } catch (error) {
  //             console.error("Error fetching data:", error);
  //           }
  //         };
  //       fetchData();
  //   }, [])




  // const addItemToCart = (item: CartItem) => {
  //   const currentCartItems = useGlobalState().cartItems;
  //   const newItemId = currentCartItems.length > 0? currentCartItems[currentCartItems.length - 1].id : "1";
  //   const newItem = {...item, id: newItemId };
  //   const updatedCartItems = [...currentCartItems, newItem];
  
  //   // Update the global state
  //   const newState = {...useGlobalState(), cartItems: updatedCartItems };
  //   setState(newState);
  //   };

  const addToCart = async () => {
    if (!product) return;
    // Find the product in the cartItems array
    console.warn('add to cart');
    console.log(product);
    addItem(product, selectedSize);
    router.push('/cart');

    // const existingProductIndex = cartItems.findIndex(p => p.id === product.id);

    // if (existingProductIndex >= 0) {
    //   // If the product exists in the cart, increment its quantity
    //   const updatedCartItems = [...cartItems];
    //   updatedCartItems[existingProductIndex].quantity += 1;
    //   setCartItems(updatedCartItems);
    // } else {
    //   // If the product doesn't exist in the cart, add it
    //   // setCartItems([...cartItems, {...product, quantity: 1 }]);
    //   const newCartItem = { id: randomUUID(),
    //     product: product,
    //     product_id: product.id,
    //     size: selectedSized,
    //     quantity: 1,
    //   }
    //   setCartItems(prevCartItems => [...prevCartItems, newCartItem]);
    // }

    // // Store the updated cart in AsyncStorage
    // try {
    //   const cartString = JSON.stringify(cartItems);
    //   await AsyncStorage.setItem('@cart', cartString);
    // } catch (error) {
    //   console.error("Error saving cart to AsyncStorage:", error);
    // }
  };
  if(!product){
    return(
      <View> Product not found </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen  options={{title: 'Details' + id}}/>
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>

      <Text style={{color: 'black'}}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((item)=>
          <Pressable onPress={()=>{setSelectedSize(item)}}  key={item} style={[styles.size, {backgroundColor: item === selectedSize ? 'gray' : 'gainsboro'}]}>
            <Text style={styles.sizeText}>{item}</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.price}>${product.price}</Text>
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