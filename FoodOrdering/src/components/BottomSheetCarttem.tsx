import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '../types';
import { Link } from 'expo-router';
import { defaultPizzaImage } from './ProductListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../provider/CartProvider';

type CartListItemProps = {
  cartItem: CartItem;
};

const BottomSheetCartItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Image
                source={{ uri: cartItem.product.image_url || defaultPizzaImage }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={{flexDirection: 'column', alignSelf:'center'}}>

            <Text style={{fontSize: 16, fontWeight: '400'}}> {cartItem.product.name}</Text>
            <Text style={{fontSize: 14, fontWeight: '400'}}> {cartItem.product.unit_price}đ</Text>
            <Text style={{fontSize: 14, fontWeight: '400'}}> Store </Text>
            </View>
        </View>
      <View style={{flexDirection: 'row', gap: 30, padding: 10, paddingHorizontal: 40, alignSelf: 'center', marginVertical: 10, borderRadius: 10, borderBlockColor: 'white', backgroundColor: 'lightgray'}}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5, fontSize: 20 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>

        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5,  fontSize: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 4,
    flexDirection: 'column',
    borderRadius: 10,
    shadowColor: 'black',
    
  },
  image: {
    width: '40%',
    aspectRatio: 1,
    borderRadius: 30,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderBlockColor: 'black',
    borderRadius: 20,
    backgroundColor: 'lightgray'
  },
  quantity: {
    fontWeight: '500',
    fontSize: 24,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default BottomSheetCartItem;