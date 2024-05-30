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


export const useMyOrderList = () =>{
  const { session} = useAuth();
  const id = session?.user.id;

  return  (useQuery({
      queryKey: ['orders', {userId: id}],
      queryFn: async () => {
        if(!id) return;
        const { data, error } = await supabase.from('orders').select('*');
        
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    }))
}

export const useCreateOrder  = () => {
  return useMutation({
    async mutationFn(data: any) {

      let { data: returnData, error } = await supabase
      .rpc('create_order', 
        // customer_id, 
        // product_details, 
        // store_id_param
        data
      )
      if (error) {
        console.log(error,'error in orders insert')
        throw error;
      }
      return returnData;
      
    },
    onError(error) {
      console.log(error);
    },
  })
  

    
}

export const useInsertOrder = () => {

  return useMutation({
  async mutationFn(data: any) {
    console.log(data, 'data in to useInsert')
    const { error, data: newOrder } = await supabase.from('orders').insert({
      total_amount: data.total_amount,
      payment_method : data.payment_method,
      customer_id:  data.customer_id,//id,
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