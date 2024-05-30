import React, { useEffect, useState } from 'react'
import { Text, View } from '../../../components/Themed'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import orders from '@/assets/data/orders';
import { StyleSheet } from 'react-native';
import { useOrderDetails } from '@/src/api/orders';
import { ActivityIndicator } from 'react-native-paper';
import Button from '@/src/components/Button';
import { useOrderDetails as useOrderDetails2 } from '@/src/api/orders/orderDetails';
import { useCart } from '@/src/provider/CartProvider';

let OrderProducts = [];
function order() {
  // const  {} = useContext(CartContext);

  const {id : idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString ==='string'? idString: idString[0])
  const {data: order, error , isLoading} = useOrderDetails(id)
  const {data: order_details, isLoading: isLoading2} = useOrderDetails2(id.toString());
  const {products} = useCart();
  
  useEffect(()=>{
    if(!isLoading && order_details){
      order_details.map((order_detail) => {
        console.log(products.find((product) => product.id === order_detail.product_id))
        console.log('/')
      }  )
    }

  },[isLoading2])
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
  console.log(order)
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: `Order #${id}`}} />
      <Button  onPress={routeBack} text='back to order'/>
      <View>
        {
          order_details?.map((order_detail) =>{
            return<Text>
              {products.find((product) => product.id === order_detail.product_id)?.brand_name}
              /
              {order_detail.quantity}
              
            </Text>
          } )
        }
      </View>
      <Text>

      </Text>
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