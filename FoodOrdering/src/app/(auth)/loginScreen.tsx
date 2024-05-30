import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import Colors from '../../constants/Colors'
import { Link, useRouter } from 'expo-router'

import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { supabase } from '@/src/lib/supabase'
import { Alert } from 'react-native'

export default function LoginScreen({  }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  async function loginWithEmail() {
    setLoading(true);
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email.value, password : password.value
    })
    if (error) Alert.alert(error.message);
    setLoading(false);
    if (data) {
      console.log('Authenticated successfully:', data.user);
    }
    
  }
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      console.warn(email.error, password.error);
      return
    }
    console.log(emailError, passwordError)
    if ( emailError.length === 0 && passwordError.length===0){
      console.warn("Logging in");
      loginWithEmail();


    }
  }

  return (
    <Background>
      <BackButton />
      <View style={{alignSelf: 'center'}}>
        <Image
        source={{ uri: "https://imgbb.host/images/imagee4c47f4b81ad6f10.png" }}
        style={styles.image}
        resizeMode="contain"
        />
        <Text style={{fontSize: 40, fontWeight: '800', alignSelf:'center', marginBottom: 20, marginRight: 10}}> E24</Text>
      </View>
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text : string) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text : string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => {  router.back(  ) } } // navigation.navigate('ResetPasswordScreen')
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Button disabled={loading}  onPress={onLoginPressed} text={loading? 'Đang đăng nhập...': 'Đăng Nhập'} />
      
      <View style={styles.row}>
        <Text> Chưa có tài khoản - </Text>
        {/* <TouchableOpacity onPress={() => { }}
             // navigation.navigate('ResetPasswordScreen')
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity> */}
        <Link href="/(auth)/RegisterScreen" style={styles.link}>
        Tạo tài khoản mới
      </Link>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: Colors.light.tint,
  },
  link: {
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  image: {
    width: 170,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
    borderRadius: 30,
  },
})