import { StyleSheet } from 'react-native';
import { COLORS } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.BACKGROUND,
  },
  box:{
    width: 100,
    height: 100,
    backgroundColor:'red'
  }
  
});