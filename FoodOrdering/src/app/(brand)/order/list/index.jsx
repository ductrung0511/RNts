
import {  View } from '@/src/components/Themed';

import OrderListItem from '@/src/components/OrderListItem';
import {  ActivityIndicator, FlatList } from 'react-native';

import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import {useBrandOrderList} from '@/src/api/orders/index';
import orders from '@/assets/data/orders';
import { Text } from 'react-native';


export default function TabOneScreen() {
  const {data: orders , error, isLoading} = useBrandOrderList({archived: false})
  if(isLoading){
    return<ActivityIndicator/>
  }
  if(error){
    console.log(error)
    return<Text>Error fetching orders </Text>
  }
  
  return (
    <View style={styles.background} >
      <FlatList
        data={orders}
        renderItem={({item})=>  <OrderListItem order={item}  /> }
        numColumns={1}
        contentContainerStyle = {{gap:10}}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  background: {
    backgroundColor: 'gainsboro',
    paddingVertical: 10,
    paddingHorizontal: 4,
    flex: 1,
  },



});
