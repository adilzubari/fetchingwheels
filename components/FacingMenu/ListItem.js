import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

const ListItem = ({Item, setTarget}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => setTarget(Item.id)}>
      <Text>{Item.name}</Text>
      <Image
        source={{
          uri: `data:image/png;base64,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`,
          width: wWidth * 0.05,
          height: wWidth * 0.05,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgb(200,200,200)',
    borderWidth: 1,
    marginHorizontal: wWidth * 0.05,
    marginVertical: wHeight * 0.01,
    paddingHorizontal: wWidth * 0.025,
    paddingVertical: wHeight * 0.02,
    borderRadius: wWidth * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListItem;