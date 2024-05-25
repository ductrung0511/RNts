import React, { useEffect, useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import orders from '@/assets/data/orders';
import { StyleSheet } from 'react-native';
import { PizzaSize } from '@/src/types';
import OrderListItem from '@/src/components/OrderListItem';
import { useOrderDetails } from '@/src/api/orders';
import { ActivityIndicator } from 'react-native-paper';
import Button from '@/src/components/Button';
function order() {
  // const  {} = useContext(CartContext);

  const {id : idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString ==='string'? idString: idString[0])
  const {data: order, error , isLoading} = useOrderDetails(id)
  const router = useRouter();
  function routeBack(){
    router.push('/(user)/order/')
  }
  if(isLoading){
    return(
      <ActivityIndicator/>
    )
  }
  if( error ) {
    return <Text> Error </Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: `Order #${id}`}} />
      <Button  onPress={routeBack} text='back to order'/>
      <OrderListItem order={order} />
{/*       
      <FlatList
       data={order?.order_items} renderItem={({item}) => <OrderItemListItem item={item} /> }
       ListHeaderComponent={()=> <OrderListItem order={order} />}
      /> */}

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