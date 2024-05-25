import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "@/src/types";
import { useAuth } from "@/src/provider/AuthProvider";


export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();
  const { session} = useAuth();
  const id = session?.user.id;
  
    return useMutation({
    async mutationFn(items: InsertTables<'order_details'>[] ) {
      const { error, data: newOrderItems } = await supabase.from('order_details')
      .insert(items)
      .select();
      if (error) {
        console.log(error,'error in Insert order Items')
        throw error;
      }
      return newOrderItems;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['orders', {userId: id}] as any);
    },
    onError(error) {
      console.log(error);
    },
  });
    
  }