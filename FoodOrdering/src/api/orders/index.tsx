import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import {OrderStatus, Product} from '@/src/types';
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/src/provider/AuthProvider";
import { Tables } from "@/src/database.types";
type Order = Tables<'orders'>

export const useBrandOrderList = ( { archived = false }: { archived: boolean }) =>{
  console.log(archived, 'archiverd');
    const statuses: OrderStatus[] = archived
      ? ['Delivered']
      : ['New', 'Cooking', 'Delivering'];

    return  (useQuery({
      queryKey: ['orders', {archived}],
      queryFn: async () => {
        console.log(statuses, 'status')
        const { data, error } = await supabase.from('orders').select('*').in('OrderStatus', statuses);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    }))
  }

export const useOrderDetails = ( id: number ) =>{
  return useQuery({
    queryKey: ['orderDetail', {id}],
    queryFn: async () =>{
      const {data, error} = await supabase.from('orders').select('*').eq('order_id', id).single();
      if(error){
        throw new Error(error.message);
      }
      return data
    }
  })
      
}
  

export const useBrandOrderList_____ = ({ archived = false }: { archived: boolean }) => {
  const statuses: OrderStatus[] = archived
    ? ['Delivered']
    : ['New', 'Cooking', 'Delivering'];
  console.warn(
      'in async warn'
    )
  return useQuery<Order[]>({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        .order('created_at', { ascending: false });
      console.log({ data, error });
      if (error) {
        console.error('Supabase query error:', error.message);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderList = () =>{
  const { session} = useAuth();
  const id = session?.user.id;

  return  (useQuery({
      queryKey: ['orders', {userId: id}],
      queryFn: async () => {
        if(!id) return;
        const { data, error } = await supabase.from('orders').select('*').eq('customer_id', '4f920f29-2fc7-4c69-87ac-94fa14953802');
        
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    }))
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const {session} = useAuth()
  const id  = session?.user.id;

  return useMutation({
  async mutationFn(data: any) {
    const { error, data: newOrder } = await supabase.from('orders').insert({
      total_amount: data.total_amount,
      payment_method : 'cash', // bank transfer, ...
      customer_id:  '4f920f29-2fc7-4c69-87ac-94fa14953802',//id,
      store_id: 1, // stored id maybe stored in useContext
      OrderStatus: 'New', //auto new when created
    })
    .select()
    .single();
    if (error) {
      console.log(error,'error in orders insert')
      throw error;
    }
    return newOrder;
  },
  // async onSuccess() {
  //   await queryClient.invalidateQueries(['orders',]);
  // },
  onError(error) {
    console.log(error);
  },
});
  
}