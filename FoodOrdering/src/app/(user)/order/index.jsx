
import {  View } from '@/src/components/Themed';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { ActivityIndicator, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import {useMyOrderList} from '@/src/api/orders/index';


export default function TabOneScreen() {
  const {data: orders, error, isLoading} = useMyOrderList(  )
  if(isLoading){
    const now = dayjs();
    return <ActivityIndicator/>
  }
  if(error){
    return<Text>Error fetching orders </Text>
  }
  // console.log(data.length, data)
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
