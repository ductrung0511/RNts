
import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Image } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

export const defaultPizzaImage = 
'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product : Product;
}

const ProductListItem = ({product} : ProductListItemProps) =>{
    return(
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image} />
        <Text style={styles.title}> {product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        
      </Pressable>
    </Link>
    
    )
  }
export default ProductListItem;


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      flex:1,

      
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: 'black',
      marginVertical: 10,
  
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    
    price: {
      color: Colors.light.tint,
      fontWeight: 'bold'
  // specific factor: issues in finance, hr, sale, diff perspecti v, what problem> solution, recommendation
  // multiple problem with (10 mintues), 1 sector > more problems
  // note: statistics to prove and citation, "number speak louder"
  // investment for R and D
    }
  });
  