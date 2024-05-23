import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type  AuthData = {
    session: Session | null;
    loading: boolean;
    profile: any;
    isBrand: boolean;
};
const AuthContext  = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isBrand: false,
});

export default function AuthProvider  ({children} : PropsWithChildren) {
    const[ session, setSession] = useState<Session | null>(null)
    const [loading, setLoading ] = useState<boolean>(true)
    const [profile, setProfile] = useState(null)
    const [isBrand, setIsBrand] = useState<boolean>(false)

    useEffect(()=>{
        async function fetchSession(){
            const {data : {session}, error} = await supabase.auth.getSession(); /// SEARCH
            setSession(session);
            if (session) {
                // fetch profile
                const { data } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                setProfile(data || null);
              }
            setLoading(false);
            
        }
        fetchSession()
        
        supabase.auth.onAuthStateChange((_event, session)=>{  /////////// SEARCH
            setSession(session);
        })
    },[])
    return <AuthContext.Provider value={{session, loading, profile, isBrand: profile?.group === 'BRAND'}}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext);