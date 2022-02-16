import React, {useEffect, useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {styles} from './AdModalStyle';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

function AdModal({AdModalVisibility, setAdModalVisibility, BannerId}) {
  const [Cross, setCross] = useState(0);

  if (AdModalVisibility) {
    setTimeout(() => {
      setCross(1);
    }, 3000);
  }

  return (
    <Modal visible={AdModalVisibility}>
      <View style={styles.container}>
        {Cross == 1 && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.iconContainer}
            onPress={() => setAdModalVisibility(false)}>
            <Image
              style={styles.closeIcon}
              source={require('../../assets/images/icons/close.png')}
            />
          </TouchableOpacity>
        )}
        <BannerAd size={BannerAdSize.WIDE_SKYSCRAPER} unitId={BannerId} />
      </View>
    </Modal>
  );
}

export default AdModal;
