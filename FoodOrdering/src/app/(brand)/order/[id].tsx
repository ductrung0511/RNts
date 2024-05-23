import React, { useEffect, useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import orders from '@/assets/data/orders';
import { StyleSheet } from 'react-native';
import {  Product } from '@/src/types';
import OrderListItem from '@/src/components/OrderListItem';
import { FlatList } from 'react-native';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { OrderStatusList } from '@/src/types';
import { Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
type ProductListItemProps = {
  product : Product;
}




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
       ListFooterComponent={()=> 
        <>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5, backgroundColor: 'gainsboro' }}>
            {OrderStatusList.map((status) => (
              <Pressable
                key={status}
                onPress={() => console.warn('Update status')}
                style={{
                  borderColor: Colors.light.tint,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:
                    order.status === status
                      ? Colors.light.tint
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    color:
                      order.status === status ? 'white' : Colors.light.tint,
                  }}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </>

        

       }
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