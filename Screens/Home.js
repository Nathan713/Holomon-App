import { TouchableOpacity,ImageBackground, StyleSheet, Text, View,Image, TextInput, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { storeData } from '../storage/store';
import { getData } from '../storage/store';

export default function Home({navigation}) {
    const images = {
        Background: require('../assets/images/background.jpeg'),
        Logo: require('../assets/images/logo.png')
    };
    const [username, onChangeUsername] = useState(null);
    const [password, onChangePassword] = useState(null);
    const [error, setError] = useState(null)
    const onRegister = () => navigation.navigate('Register')

    useEffect(() => {
      return navigation.addListener("focus", () => {
          setError(null);
          onChangePassword(null);
          onChangeUsername(null);
      });
    }, [navigation]);

    const onLogin = async (data) => {
      //navigation.navigate('BluetoothConnect')
      try
      {
        let data = {
          user_name : username,
          hash : password
        }
        var send = JSON.stringify(data);
        //const response = await fetch('http://10.0.2.2:3000/api/user/login',
        const response = await fetch('http://ec2-18-208-181-102.compute-1.amazonaws.com:3000/api/user/login',   
        {method:'POST',body:send,headers:{'Content-Type': 'application/json'}});
        const jsonRes = await response.json();
        //var res = JSON.parse(await response.text());
        console.log(jsonRes);

        if (jsonRes.error) {
          console.log("failed")
          setError("Login failed. Try Again")
        }
        else
        {
          console.log("Succesfull");
          await storeData(jsonRes.accessToken);
          let token = await getData();
          console.log(token)
          navigation.navigate('BluetoothConnect')
        }
      }
      catch(e)
      {
        console.log(e)
      }
    };

    
  return (
    <ImageBackground source={images.Background}
      style={
       styles.image
      }
      resizeMode="cover">
      <Image
        source={images.Logo}
        style={styles.logo}
      />
       <StatusBar
        backgroundColor="black"
         />
        <LinearGradient
            // Linear Gradient
            colors={['#03aed5', '#049abf', '#06698a']}
            style={styles.rectangle}>
            <Text style = {styles.text}>WELCOME</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <Text style={{color:"red"}}>{error}</Text>
            <TouchableOpacity
                
                onPress={onLogin}
                style={styles.appButtonContainer}
            >
                <Text style={styles.appButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', marginTop:5}}>
            <Text style={{color:"white"}}>Don't have an account? </Text>
            <Text style={{color:"purple"}} onPress={onRegister} >Sign Up </Text>
            </View>
        </LinearGradient>
    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems:"center"
    },
    logo: {
      marginTop:'10%',
      width: '70%',
      height:'30%',

    },
    rectangle: {
        height: '45%',
        width: '70%',
        borderRadius:50,
        alignItems: 'center',
        
      },
      text: {
        color: 'white',
        fontSize: 24,
        marginTop:30
      },
      input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'white',
        borderRadius:20,
      },
      appButtonContainer: {
        width: '60%',
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:10
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
      }
  });