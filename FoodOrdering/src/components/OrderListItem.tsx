
import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Link, useSegments } from 'expo-router';
import { Pressable } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Tables } from '../database.types';
dayjs.extend(relativeTime);
import { useCart } from '../provider/CartProvider';

 
type OrderListItemProps = {
    order : Tables<'orders'>;

}


const OrderListItem = ({order} : OrderListItemProps) =>{
    const {customers} = useCart();
    const customer =  customers.find((customer)=> customer.id === order.customer_id)
    const segment  = useSegments();
    return(
    <Link href={`/${segment[0]}/order/${order.order_id}`} asChild>
      <Pressable style={styles.container}>
        <View style={{flexDirection: 'column', gap:2}}>
            <Text style={styles.title}> {customer?.name} </Text> 
            <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <View style={{flexDirection: 'column', gap:3}}>
            
            <Text  style={{
              fontSize: 14,
              fontWeight: '300',
              color: 'black',
              backgroundColor: 'white'
              }}>{customer?.phone}</Text>
        </View>

        <Text style={styles.status}> {order.OrderStatus}</Text>
        
        
      </Pressable>
    </Link>
    
    )
  }
export default OrderListItem;


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    name: {

    },
    time:{
    fontSize: 10,
      fontWeight: '400',
      color: 'gray',
      backgroundColor: 'white'

    },

    title: {
      fontSize: 17,
      fontWeight: '800',
      color: 'black',
      backgroundColor: 'white'
    },
    // image: {
    //   width: '100%',
    //   aspectRatio: 1,
    //   resizeMode: 'contain',
    // },
    
    status : {
        justifyContent: 'center',
        alignItems: 'center',
      color: 'black',
      fontSize: 17,
      fontWeight: 'bold',
  // specific factor: issues in finance, hr, sale, diff perspecti v, what problem> solution, recommendation
  // multiple problem with (10 mintues), 1 sector > more problems
  // note: statistics to prove and citation, "number speak louder"
  // investment for R and D
    }
  });
  