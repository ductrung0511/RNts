import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../provider/AuthProvider';
import { ActivityIndicator } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { Alert } from 'react-native';
import Colors from '../constants/Colors';


/// value being stored in SecureStore is larger than 2048 bytes and it ay not be stored ......

const index = () => {
  const {session, loading, isBrand, profile} = useAuth();

  const signOut = () =>{
    supabase.auth.signOut()
  }
  const confirmSignOut = () =>{
    Alert.alert('Confirm', 'Bạn có muốn đăng xuất!', [
      {
          text: 'Hủy'
      },
      {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: signOut,
      }
  ])
  }
  if(loading) {
    return <ActivityIndicator/>
  }
  if(!session){
    <Redirect href={'/(auth)/loginScreen'}/>
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center',  padding: 10 }}>
      
      {(!loading && session) && <>

      <Text style={{fontSize: 40, marginVertical: 10, fontWeight: '900'}}>Xin Chào</Text>

      <View style={{backgroundColor: Colors.light.green, borderRadius: 10, padding: 20, marginVertical: 20}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}> 
        Là một doanh nghiệp địa phương, chúng tôi cảm ơn bạn vì
        ủng hộ và hy vọng bạn thích.
        </Text>
      </View>
      <Link href={'/(user)'} asChild>

        <Button text="Bán hàng ngay thôi!" />
      </Link>
      <Link href={'/(scan)'} asChild>

        <Button text="Scan shipper" />
      </Link>
      </>
      }
      {(!loading && !session) &&
      <>
        <View style={{alignSelf: 'center'}}>
          <Image
          source={{ uri: "https://imgbb.host/images/imagee4c47f4b81ad6f10.png" }}
          style={styles.image}
          resizeMode="contain"
          />
          <Text style={{fontSize: 40, fontWeight: '800', alignSelf:'center', marginBottom: 20, marginRight: 10}}> E24</Text>
        </View>
        <Link href={'/loginScreen'} asChild>
          <Button text="Đăng nhập để Bán hàng thôi!" />
        </Link>
        
        <Link href={'/loginScreen'} asChild>
          <Text style={{fontWeight: '300', alignSelf:'center'}}>Trở thành nhà bán hàng? <Text style={{fontWeight: '800'}}> Đăng ký ngay</Text> </Text>
        </Link>
      </>
       }
      
      
      {(!loading && session) && <PaperButton onPress={confirmSignOut} style={{marginTop: 20}} > Đăng xuất  </PaperButton>}
      
    </View>
  );
  {/* { (!loading && isBrand ) &&
  <Link href={'/(brand)'} asChild>
    <Button text="Into Brand Space" />
  </Link>
  } */}
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  image: {
    width: 170,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
    borderRadius: 30,
  },
})