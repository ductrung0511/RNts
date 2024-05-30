import { supabase } from "@/src/lib/supabase";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import {Product} from '@/src/types';
import { useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/src/database.types";
import { useCart } from "@/src/provider/CartProvider";
type Customer = Tables<'customer'>;
export const useCustomerList = () =>{

    return  useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
          const { data, error } = await supabase.from('customer').select('*');
          if (error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
}
// export const useInsetCustomer = () =>{

//   return  useQuery({
//       queryKey: ['customer'],
//       queryFn: async (data as any) => {
//         // const { data, error } = await supabase.from('customer').select('*');
//         // if (error) {
//         //   throw new Error(error.message);
//         // }
//         // return data;
//         // DUY
//         const { data: returnData, error } = await supabase
//         .from('customer')
//         .insert(data)
//         .select()
                
//       },
//     });
// }
export const useInsertCustomer = () => {
  const queryClient = useQueryClient(); 
  const {addCustomer} = useCart();


  return useMutation({
  async mutationFn(data: any) {
    console.log(data, 'data in to useInsert')
    const { error, data: newCustomer } = await supabase.from('customer').insert(data)
    .select()
    .single();
    if (error) {
      console.log(error,'error in inserting new Customer')
      throw error;
    }
    addCustomer(newCustomer);
    return newCustomer;
    },
  async onSuccess() {
    console.warn('success in ndex')
    await queryClient.invalidateQueries(['customers']);

  },
  
  onError(error) {
    console.log(error);
  },
});

}
