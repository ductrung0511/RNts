import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useCart } from '../provider/CartProvider';
import { FlatList } from 'react-native';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
import { useCallback, useRef, useState } from 'react';
import { TouchableOpacity  } from 'react-native';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TextInput from '../components/TextInput';
import { emailValidator } from '../helpers/emailValidator';
import { SelectList } from 'react-native-dropdown-select-list'
import { useInsertCustomer } from '../api/costumer';



export default function ModalScreen() {
  // const [items, setItems] = useState<CartItem[]>([]);
  const {items, total, checkout} =  useCart();
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const sheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [createCustomer, setCreateCustomer] = useState(false);
  const {customers} = useCart()
  const [paymentMethod, setPaymentMethod] = useState("");
  const paymentMethods = [
    // {key:'1', value:'Mobiles', disabled:true},
    {key:'2', value:'Tiền mặt'},
    {key:'3', value:'Chuyển khoản ngân hàng'},
    // {key:'4', value:'Computers', disabled:true},
    {key:'5', value:'Ví MOMO'},
  ]
  const [email, setEmail] = useState({ value: '', error: '' })
  const [name, setName] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [checkoutError, setCheckoutError] = useState('')
  const {mutate: useCreateCustomer} = useInsertCustomer();



  const snapPoints = [ "2%", "70%", "90%"]
  const handleSnapPress = useCallback((index)=>{
    sheetRef.current?.snapToIndex(index);
    setOpen(true);
  },[])
  const handleCreateCostumer  = () =>{
    handleSnapPress(2);
    setCreateCustomer(true);
  }
  const isOnlyNumbers = (str : string) => /^\d+$/.test(str);
  const handleCheckCustomer = () =>{

    const emailError = emailValidator(email.value);
    let nameError = '';
    if( name.value.length === 0 ) {
      nameError= 'Khách hàng cần có tên!';
    }
    let phoneError = '';
    if( !isOnlyNumbers(phone.value)  ){
      phoneError = 'Số điện thoại không bao gồm chữ!';

    }
    if(phone.value.length !== 10){
      phoneError = 'Số độ dài số điện thoại không hợp lệ';
    }
    if (emailError ||  phoneError || nameError) {
      setName({  ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPhone({ ...phone, error: phoneError })
      return
    }
    console.warn('Registering the account');
    useCreateCustomer(
      {name: name.value, email: email.value, phone: phone.value},
      {
        onSuccess: (newCustomer)=>{
          console.log(newCustomer.id,'new Customer ID,, success');
          console.log(customers);
          setSelectedCustomerId(newCustomer.id)
        }
      },
    )
  
    handleSnapPress(0);
    return;



  }
  const handleSelectCostumer = () =>{
    handleSnapPress(1);
    setCreateCustomer(false);
  }
  const confirmCheckout = ()=> {
    if(selectedCustomerId === ''){
      setCheckoutError('Đơn hàng của bạn chưa có thông tin khách hàng!')
      return;
    }
    if(paymentMethod === ''){
      setCheckoutError('Bạn chưa chọn hình thức thanh toán!')
      return;
    }
    if(items.length === 0){
      setCheckoutError('Không thể thanh toán giỏ hàng rỗng!')
      return;
    }
    setCheckoutError('')
    Alert.alert('Xác nhận đơn hàng', 'Kiểm tra lại nếu bạn không chắc!', [
      {
        text: 'Hủy'
      },
      {
          text: 'Xác nhận',
          style: 'destructive',
          onPress: () => {
            checkout(selectedCustomerId, paymentMethod)
          },
      }
    ])
  }

    return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={{backgroundColor: 'gainsboro', flex: 1}}>
      {/* <Stack.Screen name="cart" options={{ presentation: 'modal',
            headerStyle: { backgroundColor: Colors.light.green},
            headerTitleStyle: {
              fontWeight: 'bold', // Style of the header title
              color: 'white'
            },
             }} /> */}
        
        <FlatList
          data={items}
          renderItem={({item}) => 
           <CartListItem cartItem={item}/>
           }
          contentContainerStyle={{padding:10, gap:10}}
           
           />
      <Text style={styles.separator}>____________________</Text>
      <View style={{padding:10, backgroundColor: 'white', margin:10, gap:4, borderRadius: 10}}>
        {checkoutError !== '' && 
          <Text style={{color:'red', fontSize: 8, fontStyle:'italic'}}> {checkoutError}</Text>
        }
        <SelectList 
          setSelected={(val: string) => setPaymentMethod(val)} 
          data={paymentMethods} 
          save="value"
          boxStyles={{borderColor:'gray', borderWidth: 1, backgroundColor:'lavender'}}
          // dropdownStyles={}
          dropdownStyles={{backgroundColor:'lavender'}}
          // dropdownTextStyles={}
          fontFamily='serif'
          placeholder='Chọn hình thức thanh toán'
          search={false}
        />
        {/* https://www.npmjs.com/package/react-native-dropdown-select-list */}
        
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 10, backgroundColor:'white' }}>
          
          {selectedCustomerId === '' && 
          <Button text='Chọn khách hàng' onPress={handleSelectCostumer}/>
          }

          { (selectedCustomerId && selectedCustomerId !== "null"  ) && 
          <TouchableOpacity style={{flexDirection: 'column', width:'70%', backgroundColor:'darkseagreen', padding:8, borderRadius:3}} 
          onPress={() => { 
            handleSelectCostumer();
          }}>
            <Text style={{fontSize: 14, fontWeight: '300', color: 'black'}}>{customers.find( (customer) => customer.id === selectedCustomerId)?.name}</Text>
            <Text style={{fontSize: 10, fontWeight: '200', color: 'black'}}> {customers.find( (customer) => customer.id === selectedCustomerId)?.phone ? customers.find( (customer) => customer.id === selectedCustomerId)?.phone : 'Khách hàng chưa có số điện thoại!'}</Text>
          </TouchableOpacity>
          }
          {selectedCustomerId === "null" && 
          <TouchableOpacity style={{flexDirection: 'column', width:'70%', backgroundColor:'lightsalmon', padding:8, borderRadius:3}} 
          onPress={() => { 
            handleSelectCostumer();
          }}>
            <Text style={{fontSize: 14, fontWeight: '300', color: 'black'}}>Khách vãng lai</Text>
            <Text style={{fontSize: 10, fontWeight: '200', color: 'black'}}> chưa có số điện thoại khách hàng!</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity onPress={handleCreateCostumer} style={{alignSelf:'center', alignContent: 'center'}}>
            <Icon name="user-plus" size={30} color="green" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'space-around', backgroundColor:'white'}}> 
          <Text style={styles.price}>
          Tổng :
          </Text>
          <Text style={styles.price}>
          {total}đ
          </Text>
         </View>
        <Button onPress={confirmCheckout} text='Hoàn Tất'/>
        
      </View>
      <StatusBar style={Platform.OS === 'ios'? 'light' : 'auto'} />
      <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          // enablePanDownToClose={true}
          onClose={()=>{setOpen(false)}}
          // onChange={handleSheetChange}
        >
          <BottomSheetView>
            {!createCustomer &&
            <View style={{padding:10, backgroundColor: 'white', gap:10}}>
                <TouchableOpacity style={{flexDirection: 'column', backgroundColor:'lightsalmon', padding:8, borderRadius:3}} 
                  onPress={() => { 
                    setSelectedCustomerId('null');
                    handleSnapPress(0);
                  }}>
                    <Text style={{fontSize: 14, fontWeight: '300', color: 'black'}}>Khách vãng lai</Text>
                    <Text style={{fontSize: 10, fontWeight: '200', color: 'black'}}>...</Text>
                  </TouchableOpacity>
                {customers.map((customer, index) => (
                  <TouchableOpacity style={{flexDirection: 'column', backgroundColor:'cornsilk', padding:8, borderRadius:3}} key={index} 
                  onPress={() => { 
                    setSelectedCustomerId(customer.id.toString());
                    handleSnapPress(0);
                  }}>
                    <Text style={{fontSize: 14, fontWeight: '300', color: 'black'}}>{customer.name}</Text>
                    <Text style={{fontSize: 10, fontWeight: '200', color: 'black'}}> {customer.phone? customer.phone : 'Khách hàng chưa có số điện thoại!'}</Text>
                  </TouchableOpacity>
                ))}
                {/* <SelectList 
                  setSelected={(val: string) => setPaymentMethod(val)} 
                  data={paymentMethods} 
                  save="value"
                  boxStyles={{borderColor:'gray', borderWidth: 1, backgroundColor:'lavender'}}
                  // dropdownStyles={}
                  dropdownStyles={{backgroundColor:'lavender'}}
                  // dropdownTextStyles={}
                  fontFamily='serif'
                  placeholder='Chọn hình thức thanh toán'
                  search={false}
                /> */}
            </View>
             }
            {createCustomer && 
            <View style={{backgroundColor: 'white', paddingHorizontal: 10,}}>
              <TextInput
              label="Tên"
              returnKeyType="next"
              value={name.value}
              onChangeText={ (text: string) =>  setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
              autoCapitalize="none"
              autoCompleteType="name"
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
            label="Số điện thoại"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text: string) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            autoCapitalize="none"
            autoCompleteType="phone"
            textContentType="number"
            keyboardType="number"
            />
            <Button text='Tạo khách hàng mới' onPress={handleCheckCustomer}/>
            </View>

            }
          </BottomSheetView>
        </BottomSheet>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    
    color: 'white',
    width: '100%',
    marginHorizontal: 30,
  },
  price: {fontSize:20, fontWeight: '700', color:'black'},
  modalContent: {
    padding: 20,
  },
});
