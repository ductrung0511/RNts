import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
export default function MenuStack() {
    return <Stack screenOptions={{
            // headerRight: () => (
            //     <Link href="/cart" asChild>
            //     <Pressable>
            //         {({ pressed }) => (
            //         <FontAwesome
            //             name="shopping-cart"
            //             size={25}
            //             color={Colors.dark.tint}
            //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            //         />
            //         )}
            //     </Pressable>
            //     </Link>
            // ),


        }}>
            {/* <Stack.Screen name="index" options={{
                title: 'Brand\'s Orders',
                headerShown: true,
                }}/> */}
            <Stack.Screen name="list" options={{
                title: 'Brand\'s Orderss',
                headerShown: true,
                }}/>
            
        </Stack>
    
    
    
}