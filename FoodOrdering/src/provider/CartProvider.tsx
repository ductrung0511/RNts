import { CartItem } from '../types';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { Tables } from '../database.types';
import { useCreateOrder, useInsertOrder } from '../api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '../api/order_items';
import { useCustomerList } from '../api/costumer';
import { useProductList } from '../api/products';
// import { useCustomerList } from '../api/costumer';

// console.log(useCustomerList())
type Product = Tables<'products'>;
type Costumers = Tables<'customer'>[];
type Costumer = Tables<'customer'>

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity : (id: string, amount: -1 | 1, ) => void;
  total: number;
  checkout : (customer_id: string, payment_method: string) =>  void;
  customers: Costumers;
  addCustomer: (costumer: Costumer ) => void;
  products: Product[];
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: ()=> {},
  customers: [],
  addCustomer: () => {},
  products: [],

});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([ ]);
  const [customers, setCustomers] = useState<Costumers>([])
  const [products, setProducts] = useState<Product[]>([])
  const {data: dataCustomers, error, isLoading} = useCustomerList()
  const {data: dataProducts, isLoading: isProductLoading} = useProductList()
  useEffect(()=>{
    if(!isLoading && dataCustomers){
      // console.log(costumers, 'costumers');
      setCustomers(dataCustomers)
    }


  },[isLoading])
  useEffect(()=>{
    if(!isProductLoading && dataProducts){
      // console.log(costumers, 'costumers');
      setProducts(dataProducts)
    }

  },[isProductLoading])


  // it is Henry ... who. it was in the early ... when. it was complex because the planning des, it was comple . the advantage


  // if(!error && !isLoading && data) {
  //   setCustomers(data)
  //   console.warn(data, "fetched the customer")
  // }

  const router = useRouter()

  const {mutate: insertOrder} = useInsertOrder()
  const {mutate: insertOrderItems} = useInsertOrderItems()
  const { mutate: createOrder} = useCreateOrder()

  const addCustomer = (customer: Tables<'customer'>) => {
    setCustomers([...customers, customer])
  }
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

  // const total = items.reduce(
  
  //   (sum, item) => (sum += (item.product.unit_price * item.quantity) ),
    
  // );
  const total = items.reduce(
    (sum: number, item) => sum + (+item.product.unit_price * +item.quantity),
    0
  );
  const resetCart = () => {
    setItems([]);

  }
  
  const checkout = (customer_id: string, payment_method: string) => {
    console.warn('check out')
    // const orderItems  = items.map((item)=>{ return {
    //   order_id: order.order_id,
    //   product_id: item.product_id,
    //   quantity: item.quantity,
    //   unit_price: item.product.unit_price * item.quantity,
    //   }})
    // createOrder({
    //   id: id,
    //   product_details: 
    // })
    
    insertOrder({total_amount: total, customer_id, payment_method }, {
          onSuccess: ( order: Tables<'orders'> ) => {
            console.log(order, 'order')
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
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout, customers, addCustomer, products }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
