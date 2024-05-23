
import {  View } from '@/src/components/Themed';
import orders from '@/assets/data/orders';

import OrderListItem from '@/src/components/OrderListItem';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';


export default function TabOneScreen() {
  const now = dayjs();
  console.log(now - orders[0].created_at);
  
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
