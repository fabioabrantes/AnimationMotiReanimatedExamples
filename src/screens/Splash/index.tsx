import React,{useEffect} from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from  '@react-navigation/native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';


import { styles } from './styles';

export const Splash: React.FC = () => {
  const dataSplashAnimationShared = useSharedValue(0);
  
  const navigation = useNavigation();
  
  const brandStyle = useAnimatedStyle(()=>{
    return{
      opacity:interpolate(dataSplashAnimationShared.value,[0,50],[1,0]),
      transform:[
        {
          translateX:interpolate(dataSplashAnimationShared.value,[0,50],[0,-50],Extrapolate.CLAMP)
        },
      ]
    }
  });

  const logoStyle = useAnimatedStyle(()=>{
    return { 
      opacity:interpolate(dataSplashAnimationShared.value,[0,50],[0,1]),
      transform:[
        {
          translateX:interpolate(dataSplashAnimationShared.value,[0,50],[-50,0],Extrapolate.CLAMP)
        },
      ]
    }
  });

  function handleStartHomeScreen(){
    navigation.navigate('Home')
  }

  useEffect(()=>{
    dataSplashAnimationShared.value = withTiming(50,
      {duration:2000},
      ()=>{
        'worklet'
        runOnJS(handleStartHomeScreen)();
      }
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar 
          translucent 
          style="light"
          backgroundColor="transparent" 
      />
      <Animated.View style={brandStyle}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={logoStyle}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </View>
  );
}

