import {Dimensions, StyleSheet} from 'react-native';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: wWidth * 0.03,
    top: wWidth * 0.03,
  },
  closeIcon: {
    width: wWidth * 0.1,
    height: wWidth * 0.1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
