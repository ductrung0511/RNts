import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import Colors from '../../constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { Alert } from 'react-native'
import { useNavigation } from 'expo-router'

export default function RegisterScreen({  }) {  // navigation
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true);
    const {data, error} = await supabase.auth.signUp({
      email: email.value, password : password.value
    })
    if (error) Alert.alert(error.message);
    setLoading(false);

    if (data) {
      console.log('Signup succeeded:', data.user);
      const {data : loginData, error} = await supabase.auth.signInWithPassword({
        email: email.value, password : password.value
      })
      if(!error) console.warn('logged in');

    }
    
  }

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({  ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    if (emailError === '' && passwordError === '' && nameError === '') {
        console.warn('Registering the account')
        signUpWithEmail();
        return;
      }

  }

  return (
    <Background>
      <BackButton />  
      {/* goBack={navigation.goBack} */}
      <View style={{alignSelf: 'center'}}>
        <Image
        source={{ uri: "https://imgbb.host/images/imagee4c47f4b81ad6f10.png" }}
        style={styles.image}
        resizeMode="contain"
        />
        <Text style={{fontSize: 40, fontWeight: '800', alignSelf:'center', marginBottom: 20, marginRight: 10}}> E24</Text>
      </View>
      <TextInput
        label="Tên đăng ký"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text : string) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text: string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        // mode="contained"
        disabled={loading}
        onPress={onSignUpPressed}
        text={loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
        style={{ marginTop: 24 }}
      />
      
      <View style={styles.row}>
        <Text>Đã có tài khoản </Text>
        <TouchableOpacity onPress={() => {}}> 
         {/* navigation.replace('LoginScreen') */}
          <Text style={styles.link}> Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
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