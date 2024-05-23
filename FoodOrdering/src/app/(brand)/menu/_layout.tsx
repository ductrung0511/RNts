import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
export default function MenuStack() {
    return <Stack screenOptions={{
        }}>
            <Stack.Screen name="index" options={{
                title: 'Brand Menu',
                headerRight: () => (
                    <Link href="/(brand)/menu/create" asChild>
                    <Pressable>
                        {({ pressed }) => (
                        <FontAwesome
                            name="plus-square-o"
                            size={25}
                            color={Colors.dark.tint}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                        )}
                    </Pressable>
                    </Link>
                ),

                }}/>
                

        </Stack>
    
    
    
}