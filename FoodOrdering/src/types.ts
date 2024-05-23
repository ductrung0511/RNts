export type Product = {
  id: number;
  image_url: string | null;
  name: string;
  unit_price: number;
  category: string | null;
  brand_name: string;
  description: string | null;

};

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};
export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};
export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};


export type PizzaSize = 'S' | 'M' | 'L' | 'XL';
export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';




export type Profile = {
  id: string;
  group: string;
};
