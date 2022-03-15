import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  withSequence,
} from 'react-native-reanimated';

import {View, StyleSheet, StatusBar} from 'react-native';

import heroImg from '../assets/hero.png';

const Login: React.FC = () => {
  const titlePosition = useSharedValue(30);
  const imagePosition = useSharedValue(-30); // animação vem de cima para baixo

  useEffect(() => {
    imagePosition.value = withTiming(
      0,
      {
        duration: 500,
      },
      () => {
        // essa função só vai ser executada quando o withTiming acabar. ou seja, faz a animação da imagem e depois do texto
        titlePosition.value = withSequence(
          withTiming(0, {
            duration: 1000,
            easing: Easing.bounce,
          }),
          withTiming(-320, {
            // aqui o texto fica acima da imagem
            duration: 500,
            easing: Easing.bounce, // https://reactnative.dev/docs/easing
          }),
        );
      },
    );
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: titlePosition.value}],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const heroStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: imagePosition.value}],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131A" />

      <Animated.Image style={[styles.hero, heroStyle]} source={heroImg} />

      <Animated.Text style={[styles.title, titleStyle]}>
        Bem-vindo ao app
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hero: {
    width: 288,
    height: 200,
    marginBottom: 40,
  },

  title: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 32,
  },
});

export default Login;
