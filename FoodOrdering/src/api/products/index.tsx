import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import {Product} from '@/src/types';
import { useQueryClient } from "@tanstack/react-query";
export const useProductList = () =>{

    return  useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const { data, error } = await supabase.from('products').select('*');
          if (error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
}

export const useProduct = (id: number) => {
    return useQuery<Product>({
      queryKey: ['product', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };

export const useInsertProduct = () => {
    // return useMutation({
    //     async mutationFn(data : any) {
    //         console.log(data, 'data in mutate');
    //         const {error, data: newProduct} = await supabase.from('products').
    //         insert({
    //             name: data.name,
    //             image_url: data.image_url,
    //             unit_price: data.unit_price,
    //             category: data.category,
    //             brand_name: data.brand_name,
    //             description: data.description,
    //         }).
    //         single();
    //         if(error){
    //             console.log(error, 'er inserting product');
    //             throw new Error(error.message)
    //         }
    //     }
    // });

    const queryClient = useQueryClient();

    return useMutation({
    async mutationFn(data: any) {
      const { error } = await supabase.from('products').insert({
        name: data.name,
        image_url: data.image_url,
        unit_price: data.unit_price,
        category: data.category,
        brand_name: data.brand_name,
        description: data.description,
      });
      console.log('mutate function')
      if(!error) console.log('no error', error);

      if (error) {
        throw error;
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products']);
    },
    onError(error) {
      console.log(error);
    },
  });
    
}

export const useUpdateProduct = () =>{
  const queryClient = useQueryClient();

  return useMutation({
  async mutationFn(data: any) {
    const { error, data: updatedProduct } = await supabase
    .from('products')
    .update({
      name: data.name,
      image_url: data.image_url,
      unit_price: data.unit_price,
      category: data.category,
      brand_name: data.brand_name,
      description: data.description,
    })
    .eq('id', data.id)
    .select();
    console.log('mutate update function', error, updatedProduct)
    if (error) {
      throw new Error(error.message);
    }
    return updatedProduct;
  },
  async onSuccess(_, {id}) {
    await queryClient.invalidateQueries(['products']);
    await queryClient.invalidateQueries(['product', id]);
  },
  onError(error) {
    console.log(error);
  },
});
    
}