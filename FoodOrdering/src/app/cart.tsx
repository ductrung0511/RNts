import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useCart } from '../provider/CartProvider';
import { FlatList } from 'react-native';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

export default function ModalScreen() {
    // const [items, setItems] = useState<CartItem[]>([]);
    const {items, total, checkout} =  useCart();
    console.log(items, 'Item cart');
    
    return (
    <View >
        
        <FlatList
          data={items}
          renderItem={({item}) => 
           <CartListItem cartItem={item}/>
           }
          contentContainerStyle={{padding:10, gap:10}}
           
           />
      <Text style={styles.separator}>____________________</Text>
      <View style={{padding:10, backgroundColor: 'white', margin:10, borderRadius: 10}}>
        <View style={{ flexDirection: 'row', justifyContent:'space-around', backgroundColor:'white'}}> 
          <Text style={styles.price}>
          Total :
          </Text>
          <Text style={styles.price}>
          ${total}
          </Text>
         </View>
        <Button onPress={checkout} text='Checkout'/>
        
      </View>
      <StatusBar style={Platform.OS === 'ios'? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    
    color: 'white',
    width: '100%',
    marginHorizontal: 30,
  },
  price: {fontSize:20, fontWeight: '700', color:'black'},
});
