
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";

export const useOrderDetails = (order_id: string) =>{
  
    return (useQuery({
        queryKey: ['order_details', {order_id: order_id}],
        queryFn: async () => {
          if(!order_id) return;
          
          
          let { data: order_details, error } = await supabase
          .from('order_details')
          .select("*")
          .eq('order_id', order_id)
          if (error) {
            throw new Error(error.message);
          }
          return order_details;
        },
      }))
  }
  