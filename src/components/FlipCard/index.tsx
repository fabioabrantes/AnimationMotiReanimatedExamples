import React from 'react';
import { Pressable } from 'react-native';

import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming
} from 'react-native-reanimated';

import { Card } from '../Card';

import { styles } from './styles';

type Props = {
  data: {
    id: string;
    front: string;
    back: string;
  }
}

export function FlipCard({ data }: Props) {
  const  positionCardDataAnimatedShared = useSharedValue(0);

  const frontCardAnimationStyle = useAnimatedStyle(()=>{
    return { 
      transform:[
        {
          rotateY:`${interpolate(positionCardDataAnimatedShared.value,[0,1],[0,180])}deg`
        }
      ]
    }
  });

  const backCardAnimationStyle = useAnimatedStyle(()=>{
    return {
      transform:[
        {
          rotateY:`${interpolate(positionCardDataAnimatedShared.value,[0,1],[180,360])}deg`
        }
      ]
    }
  });

  function handleRotateCard(){
    const newValue = positionCardDataAnimatedShared.value === 0? 1 :0;
    positionCardDataAnimatedShared.value =withTiming(newValue,{duration:500}) 
  }

  return (
    <Pressable onPress={handleRotateCard}>
      <Card label={data.front} style={frontCardAnimationStyle} />
      <Card label={data.back} style={[styles.back,backCardAnimationStyle ]} />
    </Pressable>
  );
}