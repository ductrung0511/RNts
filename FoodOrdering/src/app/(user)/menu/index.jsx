
import {  View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Button from '@/src/components/Button';
import { useNavigation } from 'expo-router';
import { Link } from 'expo-router';
import { useProductList } from '@/src/api/products';
import { ActivityIndicator } from 'react-native-paper';

export default function TabOneScreen() {
  const navigation = useNavigation();

  const {data: products, isLoading, error } = useProductList();
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return(
      <View style={styles.background} >
      {/* <Button text='Back to Role page' onPress={()=>{navigation.navigate('/')}}/> */}
      <Link href={'/'} asChild>
        <Button text="Back to environment page" />
      </Link>
      
      <Text>error loading products</Text>
    </View>
    )
  }

  return (
    <View style={styles.background} >
      {/* <Button text='Back to Role page' onPress={()=>{navigation.navigate('/')}}/> */}
      <Link href={'/'} asChild>
        <Button text="Back to environment page" />
      </Link>
      
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
    flex: 1,

    
  },



});
