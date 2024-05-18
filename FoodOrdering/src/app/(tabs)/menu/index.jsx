
import {  View } from '@/src/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';


export default function TabOneScreen() {
  return (
    <View style={styles.background} >
      
      <FlatList
        data={products}
        renderItem={({item})=> <ProductListItem product={item}/>  }
        numColumns={2}
        contentContainerStyle = {{gap:10}}
        columnWrapperStyle= {{gap:10}}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  background: {
    backgroundColor: 'gainsboro',
    paddingVertical: 10,

    
  },



});
