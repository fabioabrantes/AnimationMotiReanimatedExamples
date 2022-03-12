import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {useAnimationState, MotiView} from 'moti';

import { styles } from './styles';
import { COLORS } from '../../global/theme';

type Props = PressableProps & {
  size?: 'small' | 'large';
  color?: 'primary' | 'secondary';
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function Button({size = 'small', color = 'primary', icon, ...rest}: Props) {
    const buttonAnimatedState = useAnimationState({
      apertar:{
        transform:[{scale:0.8}]
      },
      soltar:{
        transform:[{scale:1}]
      }
    });

  function handleAnimatedScale(state:'soltar' | 'apertar'){
    buttonAnimatedState.transitionTo(state)
  }

  return (
    <Pressable 
      onPressIn={()=>{handleAnimatedScale('apertar')}}
      onPressOut={()=>{handleAnimatedScale('soltar')}}
      {...rest}
    >
      <MotiView 
        style={[styles.container, styles[size], styles[color]]}
        state={buttonAnimatedState}
      >
        <MaterialIcons
          name={icon}
          size={size === 'small' ? 32 : 44}
          color={color === 'primary' ? COLORS.VIOLET : COLORS.WHITE}
        />
      </MotiView>
    </Pressable>
  );
}