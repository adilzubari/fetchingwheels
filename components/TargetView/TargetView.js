import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

const TargetView = ({Target, PrimaryColor}) => {
  const [ScreenReady, setScreenReady] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{flex: ScreenReady ? 1 : 0}}>
        <WebView
          source={{uri: Target.uri}}
          injectedJavaScript={Target.script}
          startInLoadingState
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          onMessage={e =>
            setScreenReady(e.nativeEvent.data == '0' ? false : true)
          }
        />
      </View>

      {!ScreenReady && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 1,
    // height: wHeight * 0.8,
    flexGrow: 1,
  },
});

export default TargetView;
