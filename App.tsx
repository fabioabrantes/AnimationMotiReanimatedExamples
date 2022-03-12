import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  useFonts, 
  Inter_400Regular,
  Inter_500Medium 
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium, 
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { Home } from './src/screens/Home';
import { Splash } from './src/screens/Splash';
import { LearningAnimation } from './src/screens/LearningAnimation';

const {Navigator, Screen} = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium, 
    Archivo_600SemiBold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }
  
  return (
    <>
      <NavigationContainer>
        
        <Navigator headerMode="none" initialRouteName="Splash">{/* era Splash */}
          <Screen 
            name="Splash" 
            component={Splash}
          />
          <Screen 
            name="LearningAnimation" 
            component={LearningAnimation}
          />
          <Screen 
            name="Home" 
            component={Home}
          />
        </Navigator>
      </NavigationContainer>
    </>
  );
}
