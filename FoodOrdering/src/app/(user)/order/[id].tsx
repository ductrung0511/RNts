import React, { useEffect, useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import orders from '@/assets/data/orders';
import { StyleSheet } from 'react-native';
import { CartItem, PizzaSize, Product } from '@/src/types';
import OrderListItem from '@/src/components/OrderListItem';
import ProductListItem from '@/src/components/ProductListItem';
import { FlatList } from 'react-native';
import CartListItem from '@/src/components/CartListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
type ProductListItemProps = {
  product : Product;
}
const sizes: PizzaSize[] = [ 'S', 'M', 'L', 'XL'];

function order() {
  // const  {} = useContext(CartContext);

  const {id} = useLocalSearchParams();
  const order = orders.find((p) => p.id.toString() === id);
  console.log(order?.order_items)

  
  if(!order){
    return(
      <View> <Text>Order not found</Text> </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: `Order #${id}`}} />
      {/* <Text style={styles.price}>Hello order id {id}</Text> */}
      <FlatList
       data={order?.order_items} renderItem={({item}) => <OrderItemListItem item={item} /> }
       ListHeaderComponent={()=> <OrderListItem order={order} />}
      />

    </View>
  )
}

export default order;

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'white',
    width: '100%',
    aspectRatio: 1,
  },
  container:
  {
    backgroundColor: 'gainsboro',
    padding: 10,
    flex: 1,
    gap: 8,


    
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