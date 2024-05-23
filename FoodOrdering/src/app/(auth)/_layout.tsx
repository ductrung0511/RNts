import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AuthLayout () {
    const {session, loading } = useAuth();
    console.log(session, 'session in Auth')
    if( session) {
        
        return <Redirect href={'/'}/>
        
        
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <Stack screenOptions={{headerShown: false}}/>
        </SafeAreaView>
    )
}