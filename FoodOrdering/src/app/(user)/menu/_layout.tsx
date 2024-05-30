import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import BackButton from "@/src/components/BackButton";
export default function MenuStack() {
    return <Stack screenOptions={{
            // headerLeft: () => (
            //     <BackButton/>
            // ),
            headerRight: () => (
                <Link href="/cart" asChild> 
                <Pressable>
                    {({ pressed }) => (
                    <FontAwesome
                        name="shopping-cart"
                        size={25}
                        color={Colors.dark.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                    )}
                </Pressable>
                </Link>
            ),
        }}>
            <Stack.Screen name="index" options={{
                title: 'Danh sách món',
                headerStyle: {
                    backgroundColor: Colors.light.green, // Change the header background color
                },
                  headerTintColor: 'white', // Change the color of the back button and title
                  headerTitleStyle: {
                    fontWeight: 'bold', // Customize the title style
                  },
                
                // headerBackTitle: 'Custom Back',
                // headerBackTitleStyle: { fontSize: 30 },
                }}/>
        </Stack>
    
    
    
}