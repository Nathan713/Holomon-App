import { Image,TouchableOpacity,StyleSheet, Text, View,Dimensions } from 'react-native'
import React, {useState} from 'react'
import { getData } from '../storage/store';
import useBLE from '../useBLE';

export default function PokemonSelect({write, connectedDevice, name, image }) {
  const {
    writeData
  } = useBLE();

  

const onPress = () => {
 
    write(name)
  
  // try
  //     {
  //       let token = await getData();
  //       //const response = await fetch('http://10.0.2.2:3000/api/user/pokemon',
  //       const response = await fetch('http://ec2-18-208-181-102.compute-1.amazonaws.com:3000/api/user/pokemon',
  //         {headers:{'Content-Type': 'application/text',
  //                   'Authorization': `Bearer ${token}`}});
  //       const res = await response.text();
  //       //var res = JSON.parse(await response.text());
  //       //console.log(res);

  //     }
  //     catch(e)
  //     {
  //       console.log(e)
  //     }
 // console.log("You selected " + JSON.stringify(name))
}

  return (
    <View style = {styles.container}>
        <View style = {styles.redBackground}/>
        <View style = {styles.blackBackground}>
            <View style = {styles.whiteInnerCircle}/>
        </View>
        <View style = {styles.whiteBackground}>
          <Text style = {styles.bottomText}>Choose Your Pokemon</Text>
        </View>

        <View style={styles.positionButton}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>GO</Text>
                
            </TouchableOpacity>
        </View>
        
        <View style = {styles.positionPokemon}>   
            <Text style={styles.pokemonName}>{name}</Text>
            <Image
            style ={{resizeMode: 'contain',height:'50%', width:'50%'}}
            source = {image}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    redBackground: {
        backgroundColor: 'red',
        height: '77%',
    },
    blackBackground: {
        backgroundColor: 'black',
        height:'3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteBackground: {
        backgroundColor: 'white',
        height:'20%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    whiteInnerCircle: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
        borderColor:'black' ,
        borderWidth:5 
    },
    appButtonContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',    
        borderColor:'black' ,
        borderWidth:20
      },
      appButtonText: {
        fontSize: 35,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
      },
      pokemonName:{
        fontSize: 40,
        color:'white',
      },
      positionButton: {
        position: "absolute",
        top: '55%',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
      },
      positionPokemon:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 100,
        justifyContent: "center",
        alignItems: "center",
      },
      bottomText: {
        fontSize: 30,
        fontWeight:'bold',
        fontStyle: 'italic'
      }
})