import { Stack } from "expo-router";
export default function MenuStack() {
    return <Stack screenOptions={{
        }}>
            <Stack.Screen name="list" options={{
                title: 'Đơn hàng',
                headerShown: true,
                }}/>
            
        </Stack>
}