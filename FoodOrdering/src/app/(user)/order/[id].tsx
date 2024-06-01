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
import { Tables } from '@/src/database.types';
import { FlatList } from 'react-native-gesture-handler';
import GestureHandlerRootView from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
let OrderProducts : Tables<'products'>[] = [];
let customer: Tables<'customer'> ;
function order() {
  // const  {} = useContext(CartContext);

  const {id : idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString ==='string'? idString: idString[0])
  const {data: order, error , isLoading} = useOrderDetails(id)
  const {data: order_details, isLoading: isLoading2} = useOrderDetails2(id.toString()); // pass in the Order_id
  const {customers} = useCart()
  const {products} = useCart();
  
  useEffect(()=>{
    if(!isLoading2 && order_details){
      OrderProducts = products.filter((product) => {
        return order_details.find((order_detail)=> order_detail.product_id === product.id);
      });

    }
    
  },[isLoading2])
  useEffect(()=>{
    const order_customer = customers.find((customer) => customer.id === order?.customer_id) 
    if( order_customer){
      customer = order_customer;
    }
  },[isLoading])
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
      <Stack.Screen options={{title: `Đơn hàng ăn uống`}} />
      <View style={{backgroundColor:'lightblue', flexDirection: 'column', padding:10, borderRadius: 4}}>
          <Text style={styles.customerInfo}> {customer?.name}</Text>
          <Text style={styles.customerInfo}> {customer?.email}</Text>
          <Text style={styles.customerInfo}> {customer?.phone}</Text>
          <Text style={styles.customerInfo}> {customer?.created_at}</Text>
      </View>
      
      <View>
        {
          order_details?.map((order_detail, index) =>{
            return <View style={{backgroundColor:'lightgreen', flexDirection: 'row', padding:10, borderRadius: 4}}>
                    <Image style={styles.image} source={{ uri: OrderProducts[index]?.image_url || defaultPizzaImage}}/>
                    <View style={{flexDirection:'column'}}>
                      {/* <Text>{OrderProducts.find((product)=> product.id === order_detail.product_id)?.image_url}</Text> */}
                      <Text style={styles.detail_info}>{OrderProducts.find((product)=> product.id === order_detail.product_id)?.brand_name}</Text>
                      <Text style={styles.detail_info}>{OrderProducts.find((product)=> product.id === order_detail.product_id)?.name}</Text>
                    </View>
                  </View>
          } )
        }
      </View>
      

      
{/*       
      <FlatList
       data={order?.order_items} renderItem={({item}) => <OrderItemListItem item={item} /> }
       ListHeaderComponent={()=> <OrderListItem order={order} />}
      /> */}

    </View>
  )
}

// <FlatList
//       data={order_details}
//       renderItem={(order_detail)=>
//       <View style={{backgroundColor:'lightgreen', flexDirection: 'row', padding:10, borderRadius: 4}}>
//         {/* <Image uri={OrderProducts.find((product)=> product.id === order_detail.product_id).image_url}/> */}
//         {/* <Text>{OrderProducts.find((product)=> product.id === order_detail.product_id)?.image_url}</Text> */}
//         {/* <Text>{OrderProducts.find((product)=> product.id === order_detail.product_id)?.brand_name}</Text> */}
//         {/* <Text>{OrderProducts.find((product)=> product.id === order_detail.product_id)?.name}</Text> */}
      



//       </View>}
//       ListHeaderComponent={<>
//       <Button  onPress={routeBack} text='back to order'/>
      
//       </>}
//       />

export default order;

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'white',
    width: 10,
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
  customerInfo:{
    fontSize: 17,
    fontWeight : '300',
    color: 'gray',
  },
  detail_info :{
    fontSize: 14,
    fontWeight : '300',
    color: 'gray',
  },
  sizes:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  
  })