
import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Image } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import { Pressable } from 'react-native';
import { Tables } from '../database.types';
 
export const defaultPizzaImage = 
'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product : Tables<'products'>;
}

const ProductListItem = ({product} : ProductListItemProps) =>{
    const segment  = useSegments();
    console.log(segment);
    return(
    <Link href={`/${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{uri: product.image_url || defaultPizzaImage}} style={styles.image} />
        <Text style={styles.title}> {product.name}</Text>
        <Text style={styles.price}>${product.unit_price}</Text>
        
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
      resizeMode: 'cover',
      borderRadius: 10,
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
  