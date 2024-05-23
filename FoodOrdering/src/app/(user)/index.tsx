import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";

export default function TabIndex(){
    const {session, loading} = useAuth();
    if(!loading) console.log(session, 'session');
    return <Redirect href={'(user)/menu/'}/>
}