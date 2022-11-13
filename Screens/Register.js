import { StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable,Button, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {Controller, useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Register({navigation}) {
    const [date,setDate] = useState(new Date());
    const [show,setShow] = useState(false);
    const [text,setText] = useState('');

    const onRegister = async (data) => {
        try
        {
          let json = {
            "first_name": data.firstName,
            "last_name": data.lastName,
            "email" : data.email,
            "hash": data.password,
            "username": data.username,
            "date_of_birth": data.dateOfBirth,
            "last_login": new Date(),
            "last_pokemon_fetch": new Date(),
            "current_pokemon": "1"
          }
        
          var send = JSON.stringify(json);
          
          //const response = await fetch('http://10.0.2.2:3000/api/user/',
          const response = await fetch('http://ec2-18-208-181-102.compute-1.amazonaws.com:3000/api/user/',
          {method:'POST',body:send,headers:{'Content-Type': 'application/json'}});
          var res = JSON.parse(await response.text());
          console.log(res);
          if (res.error) {
            console.log("failed")
          }
          else
          {
            console.log("Succesfull");
            navigation.navigate('Home')
          }
        }
        catch(e)
        {
          console.log(e)
        }
      };

    const onChanged = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' |Minutes: ' + tempDate.getMinutes();
        setText(fDate);
        setValue("dateOfBirth", fDate);
        
    }

    const showPicker = () => {
        setShow(true);
    }
    const set = () => {
        setText(date)
    }
    const {setValue,watch, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
        firstName: '',
        lastName: ''
        }
    });
    const pwd = watch('password')
    const onSubmit = data => {
        console.log(data);
    };
    
    return (
    <LinearGradient
        // Button Linear Gradient
        colors={['#fff1d0', '#fff1df', '#b0b0af']}
        style={styles.container}>
        { show &&
                        <DateTimePicker
                        onChange={onChanged}
                        value={date}
                        />
                        }
        <View style={styles.account}>
        <MaterialCommunityIcons name="account" size={60} color="#03aed5"/>
        </View>
        
        < LinearGradient
            colors={['#03aed5', '#049abf', '#06698a']}
            style={styles.rectangle}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                keyboardDismissMode={'on-drag'}
                style = {styles.scroll}>
                
            <Text style={styles.label}>First name</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="firstName"
                rules={{ required: 'Required Field'}}
            />
            {errors.firstName && <Text style={styles.error}>{errors.firstName.message || 'Error'}</Text>}
            
            <Text style={styles.label}>Last name</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="lastName"
                rules={{ required: 'Required Field' }}
            />
            {errors.lastName && <Text style={styles.error}>{errors.lastName.message || 'Error'}</Text>}
            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="email"
                rules={{ required: 'Required Field' , pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }}}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message || 'Error'}</Text>}
            <Text style={styles.label}>Date of Birth</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value, ref }}) => (
                    <View>
                        {/* {console.log(text)} */}
                        <TextInput
                            style={styles.input}
                            onFocus={showPicker}
                            onChange={onChanged} 
                            value={text}
                         />
                  </View>
                )}
                name="dateOfBirth"
                rules={{required: 'Required Field' }}
            />
            {errors.dateOfBirth && <Text style={styles.error}>{errors.dateOfBirth.message || 'Error'}</Text>}
            
            <Text style={styles.label}>UserName</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="username"
                rules={{ required: 'Required Field' }}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message || 'Error'}</Text>}

            <Text style={styles.label}>Password</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="password"
                rules={{ required: 'Required Field' }}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message || 'Error'}</Text>}
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="confirmPassword"
                rules={{ validate: value => value === pwd || 'Passwords Do Not Match' }}
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message || 'Error'}</Text>}
                <Pressable
                    style={styles.submitButton}
                    onPress={handleSubmit(onRegister)}
                >
                    <Text>Sign Up</Text>
                    
                    </Pressable>
                    </ScrollView>
        </LinearGradient>
        
        <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
                style={styles.backButton}
    >
        <AntDesign name="arrowleft" size={50} color="white"/>
            </TouchableOpacity>
    
    </LinearGradient>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle: {
        height: '70%',
        width: '70%',
        borderRadius:50,
        alignItems: 'flex-start',
        justifyContent: 'center'
        
    },
    input: {
        width: '60%',
        borderWidth: 1,
        padding:5,
        backgroundColor:'white',
        borderRadius: 20,
        elevation: 10,
        marginStart: '20%'
      },
    label: {
        color: 'white',
        fontSize: 16,
        padding: 5,
        marginStart: '20%'
    
    },
    submitButton: {
        borderRadius: 8,
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: 'center'
      },
    backButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#066788', 
        marginTop: 10  
    },
    account: {
        width: 70,
        height: 70,
        borderWidth: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 100,
        margin: 10,
        borderColor: '#03aed5'
    },
    error: {
        color: 'red',
        fontSize:14,
        padding: 5,
        marginStart: '20%'
    },
    scroll : {
        width: '100%',
        
        
    }
})