import {  View } from '@/src/components/Themed';
import OrderListItem from '@/src/components/OrderListItem';
import { ActivityIndicator, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import orders from '@/assets/data/orders';
import {useBrandOrderList} from '@/src/api/orders/index';
import { Text } from 'react-native';

export default function TabOneScreen() {
  const {data: orders , error, isLoading} = useBrandOrderList({archived: true})
  if(isLoading){
    return<ActivityIndicator/>
  }
  if(error){
    console.log(error)
    return<Text>Error fetching orders </Text>
  }
  // console.log(data, 'real form order');
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
