import React from 'react';
import {View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring, // tipo de animação mais suave
} from 'react-native-reanimated';

// import { Container } from './styles';

const Drag: React.FC = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx: any) {
      posX.value = ctx.posX + event.translationX;
      posY.value = ctx.posY + event.translationY;
    },
    onEnd() {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: posX.value}, {translateY: posY.value}],
    };
  });

  return (
    <View style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {width: 150, height: 150, backgroundColor: 'red'},
            positionStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

export default Drag;
