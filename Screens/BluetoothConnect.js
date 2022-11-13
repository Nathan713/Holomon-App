import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Pressable,FlatList, Dimensions, StatusBar
} from 'react-native';
import DeviceModal from '../DeviceConnectionModal';
import useBLE from '../useBLE';
import PokemonSelect from '../Components/PokemonSelect'
import pokemon from '../assets/pokemonData/pokemonData'
import BackArrow from '../Components/BackArrow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { removeItemValue } from '../storage/store';
import { getData } from '../storage/store';

export default function BluetoothConnect({navigation}) {
    const {
      requestPermissions,
      scanForPeripherals,
      allDevices,
      connectToDevice,
      connectedDevice,
      //heartRate,
      disconnectFromDevice,
      writeData
    } = useBLE();
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const scanForDevices = () => {
      requestPermissions(isGranted => {
        if (isGranted) {
          scanForPeripherals();
        }
      });
    };
  
    const write = (message) => {
      writeData(message)
    }

    const disconnect = () => {
      disconnectFromDevice
      
    }
  
    const hideModal = () => {
      setIsModalVisible(false);
    };
  
    const openModal = async () => {
      scanForDevices();
      setIsModalVisible(true);
    };
    const currentIndex = useRef(0);
    const flatListRef = useRef(null);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 100 })

    useEffect(() => {
      currentIndex.current = 0;
      setIsPrevDisabled(true);
    }, [pokemon]);

    const handleOnViewableItemsChanged = useCallback(
      ({viewableItems}) => {
        const itemsInView = viewableItems.filter(
          ({item}) => item.id,
        );
  
        if (itemsInView.length === 0) {
          return;
        }
  
        currentIndex.current = itemsInView[0].index;
  
        setIsNextDisabled(currentIndex.current === pokemon.length-1);
        setIsPrevDisabled(currentIndex.current === 0);
      },
      [pokemon],
    );
    const handleOnPrev = () => {
        if (currentIndex.current === 0 || isPrevDisabled) {
          return;
        }
    
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            animated: true,
            index: currentIndex.current - 1,
          });
        }
      };
    
      const handleOnNext = () => {
        
        if (currentIndex.current === pokemon.length || isNextDisabled) {
          return;
        }
    
        else if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            animated: true,
            index: currentIndex.current + 1,
          });
        }
      };

    const {width, heigth} = Dimensions.get('window');
    
    const onLogout = async () => {
      await removeItemValue();
      navigation.pop()
    }
    
    const renderItem = ({ item }) => (
        <View style={{width:width,height:heigth}} ><PokemonSelect write = {write} connectedDevice = {connectedDevice} name = {item.name} image = {item.image} /></View>
      );
  
    return (
      <View style={styles.container}>
         <StatusBar
        backgroundColor="black"
         />
        <View style={styles.heartRateTitleWrapper}>
          {connectedDevice ? (
                      
             <>
               <View style = {{flex:1}}>
    <FlatList
        ref={flatListRef}
        data={pokemon}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate={"fast"}
        snapToInterval={width}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={
          viewConfigRef.current
        }    
    />
    
    
        <View style = {styles.leftArrowPosition}>
        <Pressable
          onPress={handleOnPrev}
          disabled={isPrevDisabled}
          style={({pressed}) => [
            {
              opacity: pressed || isPrevDisabled ? 0.5 : 1.0,
            },
            styles.leftArrow
          ]}>
            <AntDesign name="arrowleft" size={70} color="white"/>
        
        </Pressable>
        </View>
        <View style = {styles.rightArrowPosition}>
        <Pressable
          onPress={handleOnNext}
          disabled={isNextDisabled}
          style={({pressed}) => [
            {
              opacity: pressed || isNextDisabled ? 0.5 : 1.0,
            },
            styles.rightArrow,
          ]}>
          <AntDesign name="arrowright" size={70} color="white"/>
        </Pressable>
        </View>
      
    </View>

             
            </>
          ) : (
            <View style = {{flex:1}}>
            <View style = {styles.ArrowBackground}>
            <BackArrow  onPress={onLogout}/>
            </View>
            
            <Text style={styles.heartRateTitleText}>
              Please Connect to Holomon Device
            </Text>
            </View>
  
          )}
        </View>
        
        <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
        <DeviceModal
          closeModal={hideModal}
          visible={isModalVisible}
          connectToPeripheral={connectToDevice}
          devices={allDevices}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    heartRateTitleWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartRateTitleText: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
      color: 'black',
      top: '50%'
    },
    heartRateText: {
      fontSize: 25,
      marginTop: 15,
    },
    ctaButton: {
      backgroundColor: 'purple',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      borderRadius: 8,
      marginBottom: 10
    },
    ctaButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    ArrowBackground: {
      position: "absolute",
      top: StatusBar.currentHeight || 24,
      left: 10,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-start'
  },
  ArrowContainer: {
      position: "absolute",
      top: '60%',
      left: 0,
      right: 0,
      bottom: 0,
    },
  leftArrowPosition: {
    position: "absolute",
      top: '60%',
      left: 0,
      right: 0,
      bottom: 0,
    alignItems: "flex-start"
  },
  rightArrowPosition: {
    position: "absolute",
      top: '60%',
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "flex-end"
  }
  });