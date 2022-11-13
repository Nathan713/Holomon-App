import { Pressable,FlatList,StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PokemonSelect from '../Components/PokemonSelect'
import pokemon from '../assets/pokemonData/pokemonData'
import BackArrow from '../Components/BackArrow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { removeItemValue } from '../storage/store';
import { getData } from '../storage/store';

export default function SelectScreen({route,navigation}) {
    const { connectedDevice } = route.params;
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
        <View style={{width:width,height:heigth}} ><PokemonSelect connectedDevice = {connectedDevice} name = {item.name} image = {item.image} /></View>
      );
    
  return (
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
    <View style = {styles.ArrowBackground}>
    <BackArrow  onPress={onLogout}/>
    </View>
    
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
  )
}

const styles = StyleSheet.create({
    ArrowBackground: {
        position: "absolute",
        top: StatusBar.currentHeight || 24,
        left: 10,
        right: 0,
        bottom: 0,
        justifyContent: "flex-start", 
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

})