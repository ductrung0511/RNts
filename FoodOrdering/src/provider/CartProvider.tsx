import { CartItem } from '../types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { Tables } from '../database.types';
import { useInsertOrder } from '../api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '../api/order_items';

type Product = Tables<'products'>;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity : (id: string, amount: -1 | 1, ) => void;
  total: number;
  checkout : () =>  void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: ()=> {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([ ]);
  const router = useRouter()

  const {mutate: insertOrder} = useInsertOrder()
  const {mutate: insertOrderItems} = useInsertOrderItems()
  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart, increment quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(), 
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    
    setItems([newCartItem, ...items]);
    

  };

  // updateQuantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items.map((it) => it.id === itemId ? {...it, quantity: it.quantity + amount}: it)
      .filter((item) => item.quantity > 0)
  )
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.unit_price * item.quantity),
    0
  );
  const resetCart = () => {
    setItems([]);

  }
  
  const checkout = () => {

    console.warn('check out')
    insertOrder({total_amount: total}, {
          onSuccess: ( order: Tables<'orders'> ) => {
            console.log(order, 'order')
            const item1 = items[0]
            const orderItems  = items.map((item)=>{ return {
              order_id: order.order_id,
              product_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.product.unit_price * item.quantity,
              }})
            insertOrderItems(
              // order_id: order.order_id,
              // product_id: item1.product_id,
              // quantity: item1.quantity,
              // unit_price: item1.product.unit_price * item1.quantity,
              orderItems
              
            ,{onSuccess:()=>{
              resetCart();
              router.push(`/(user)/order/${order.order_id}` )
            }})
            

          },
          onError: (error)=> {
            console.log(error, 'error')

          },
    })
    }
  

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
