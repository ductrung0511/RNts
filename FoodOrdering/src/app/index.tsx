import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../provider/AuthProvider';
import { ActivityIndicator } from 'react-native-paper';
import { supabase } from '../lib/supabase';


/// value being stored in SecureStore is larger than 2048 bytes and it ay not be stored ......

const index = () => {
  const {session, loading, isBrand, profile} = useAuth();
  if(loading) {
    return <ActivityIndicator/>
  }
  if(!session){
    <Redirect href={'/(auth)/loginScreen'}/>
  }
  console.log(profile);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      {(!loading && session) && 
      <Link href={'/(user)'} asChild>
        <Button text="Into User Space" />
      </Link>
      }
      { (!loading && isBrand ) &&
      <Link href={'/(brand)'} asChild>
        <Button text="Into Brand Space" />
      </Link>
      }
      {(!loading && !session) &&
      <Link href={'/loginScreen'} asChild>
        <Button text="Login" />
      </Link>
       }
      
      {(!loading && session) && <Button onPress={()=>{ supabase.auth.signOut()}} text="Sign out" />}
      
    </View>
  );
};

export default index;