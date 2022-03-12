import React from 'react';
import { View, Button,Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import { styles } from './styles';

const WIDTH = Dimensions.get('window').width;

export const LearningAnimation: React.FC = () => {
  const dataAnimatedShared = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(()=>{
    return {
      transform: [
        {
          translateX:withTiming(dataAnimatedShared.value,{
            duration:500,
            easing:Easing.bezier(0,.99,.93,.02)
          })
        },
        
      ]
    }
  });

  function handleAnimationMove(){
    dataAnimatedShared.value = Math.random()*(WIDTH - 100);
  }

  return (
    <View style={styles.container}>
      <StatusBar 
          translucent 
          style="light"
          backgroundColor="transparent" 
      />
      <Animated.View style={[styles.box,animatedStyles]}/>
      <Button title="Mover" onPress={handleAnimationMove}/>
    </View>
  );
}

