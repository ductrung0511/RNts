
import {  View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Button from '@/src/components/Button';
import { useNavigation, useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { useProductList } from '@/src/api/products';
import { ActivityIndicator, IconButton, RadioButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/Themed';
import { Button as PaperButton } from 'react-native-paper';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { useCart } from '@/src/provider/CartProvider';
import CartListItem from '@/src/components/CartListItem';
import BottomSheetCartItem from '@/src/components/BottomSheetCarttem';

export default function TabOneScreen() {
  // hooks
  const sheetRef = useRef(null);

  const snapPoints = [ "10%", "70%", "90%"]
  const handleSnapPress = useCallback((index)=>{
    sheetRef.current?.snapToIndex(index);
    setOpen(true);
  },[])
  const {total, addItem, items} = useCart();
  const [idItem, setIdItem] = useState(null);
  const [open, setOpen] = useState(false);
  const handleAddToCart = () =>{
    // handleSnapPress(0);
    handleSnapPress(0);
    setOpen(false);
    setIdItem(null);
    }
  const router = useRouter();
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
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.background} >
        {/* <Button text='Back to Role page' onPress={()=>{navigation.navigate('/')}}/> */}
          {/* <Button text="Back to environment page" /> */}
        
        <FlatList
          data={products}
          renderItem={({item})=> <ProductListItem handleSnapPress={handleSnapPress} setOpen={setOpen} setIdItem={setIdItem} product={item}/>  }
          numColumns={2}
          contentContainerStyle = {{gap:10}}
          columnWrapperStyle= {{gap:10}}
          ListHeaderComponent={
            <View style={{justifyContent:'space-between', backgroundColor: 'gainsboro'}}>
              <PaperButton onPress={()=>{router.push('/')}}> Back </PaperButton>
            </View>
          }
          // ListFooterComponent={
          // //  <Button text="Touch" onPress={()=>handleSnapPress(0)} />

          // } 
        />
        {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
        <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
        <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
        <Button title="Close" onPress={() => handleClosePress()} /> */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          // enablePanDownToClose={true}
          onClose={()=>{setOpen(false)}}
          // onChange={handleSheetChange}
        >
          <BottomSheetView style={{flex:1, backgroundColor:'white'}}>
          <Text style={{color: 'black', fontSize: 30, color: 'green', fontWeight: '900', alignItems: 'center',alignSelf: 'flex-end', fontFamily: 'serif', marginHorizontal: 10}}> {items.length} - {total}đ </Text>
          {(idItem && items.find((item)=> item.product_id === idItem)) && 
            <View style={styles.container}>
              {/* <Text style={{color: 'white'}}> {items.find((item)=> item.product_id === idItem)?.product_id} {typeof items.find((item)=> item.product_id === idItem)} </Text> */}
              
              <BottomSheetCartItem cartItem={items.find((item)=>  item.product_id  === idItem)}/>
              {/* <Button onPress={() => {addToCart(products.find((product)=> product.id === idItem))} } text='Add to cart'/> */}
            </View>
          }
          {(idItem && open)&&
          // <TouchableOpacity style={styles.button} onPress={handleCancleAddToCart}>
          //   <Text style={{color: 'black'}}> cancel</Text>
          // </TouchableOpacity>
          <Button onPress={handleAddToCart} text='Thêm vào giỏ hàng' />
          }
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  background: {
    backgroundColor: 'gainsboro',
    paddingVertical: 10,
    flex: 1,
  },
  container:{
    padding: 20,
    height: 'auto',
    backgroundColor: 'gainsboro',
  }




});
