import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
  Modal,
} from 'react-native';
import FacingMenu from './components/FacingMenu/FacingMenu';
import TargetView from './components/TargetView/TargetView';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import AdModal from './components/AdModal/AdModal';
import SplashScreen from 'react-native-splash-screen';

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const PrimaryColor = '#F27649';
const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
const TopBannerID =
  process.env.NODE_ENV == 'development'
    ? TestIds.BANNER
    : 'ca-app-pub-7645788842133190/1208635738';
const BottomBannerID =
  process.env.NODE_ENV == 'development'
    ? TestIds.BANNER
    : 'ca-app-pub-7645788842133190/2521717402';
const FullBannerID =
  process.env.NODE_ENV == 'development'
    ? TestIds.BANNER
    : 'ca-app-pub-7645788842133190/9866882621';
const MenuList = [
  // {
  //   id: "bl",
  //   name: "Balochistan",
  //   uri: "",
  //   script: ``,
  // },
  {
    id: 'gb',
    name: 'Gilgit Baltistan',
    uri: 'http://gbexcise.gov.pk/vehicle-search/',
    script: `
    document.querySelector('.html').onload = (() => {
      const target = ['.header_section', '.navigation_menu','.enigma_header_breadcrum_title', 'h4', 'center', 'h5', 'p', 'h5', 'p', '.enigma_footer_widget_area', '.enigma_footer_area', '.push-right', '.enigma_scrollup', 'font', 'label','p','p','p'];
      target.forEach(element => {
        document.querySelector(element).remove();
      });
      window.ReactNativeWebView.postMessage("1");
    })();
    `,
  },
  {
    id: 'isl',
    name: 'Islamabad',
    uri: 'http://www.islamabadexcise.gov.pk/',
    script: `
    document.querySelector('.html').onload = (() => {
      const target = ['#myModal', 'table', '.topnav', '.sp-slideshow'];
      target.forEach(element => {
        document.querySelector(element).remove();
      });
      var iframe = document.getElementById('MyFrame');
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      innerDoc.querySelector('#marketing>div:nth-child(3)>section>ul>li:nth-child(1)>a').click();
      innerDoc.querySelector('p').remove();
      window.ReactNativeWebView.postMessage("1");
    })();
    `,
  },
  {
    id: 'kp',
    name: 'KPK',
    uri: 'https://www.kpexcise.gov.pk/mvrecords/',
    script: `
    document.querySelector('.html').onload = (() => {
      document.querySelector('#main2').style.width = '100%';
      const target = ['center','center','center',
      '#form1>table>tbody>tr>td>div>table>tbody>tr:nth-child(2)',
      '#form1>table>tbody>tr>td>div>table>tbody>tr:nth-child(2)',
      '#form1>table>tbody>tr>td>div>table>tbody>tr:nth-child(2)',
      '#form1>table>tbody>tr>td>div>table>tbody>tr:nth-child(2)',
      '#form1>table>tbody>tr>td>div>table>tbody>tr:nth-child(1)>td:nth-child(7)',
      '#form1>table>tbody>tr>td>div>table>tbody>tr:nth-child(1)>td:nth-child(1)',
    ];
      target.forEach(element => {
        document.querySelector(element).remove();
      });
      window.ReactNativeWebView.postMessage("1");
    })();
    `,
  },
  {
    id: 'pb',
    name: 'Punjab',
    uri: 'https://mtmis.excise.punjab.gov.pk/',
    script: `
    document.querySelector('.html').onload = (() => {
      const target = ['.breadcrumb','#navbar','#page-title','.footer','a.btn','.modal-backdrop','#myModal'];
      target.forEach(element => {
        document.querySelector(element).remove();
      });
      window.ReactNativeWebView.postMessage("1");
    })();
    `,
  },
  {
    id: 'sd',
    name: 'Sindh',
    uri: 'https://excise.gos.pk/vehicle/vehicle_search',
    script: `
    document.querySelector('.html').onload = (() => {
      const target = [
        '.header_bg_full',
        '.menu_bg_full',
        '.inner_header',
        '.footer_bg_full',
        '.breadcrumb',
        '.block_bg',
        '#search_form>.row>div>img',
        '#search_form>.row>div:nth-child(2)>img',
        'h1',
      ];
      target.forEach(element => {
        document.querySelector(element).remove();
      });
      window.ReactNativeWebView.postMessage("1");
    })();
    `,
  },
];

export default function App() {
  const [Target, setTarget] = useState(null);
  const [AdModalVisibility, setAdModalVisibility] = useState(false);

  const LandBackToHomeScreen = () => {
    setTarget(null);
    setTimeout(() => {
      setAdModalVisibility(true);
    }, 500);
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (Target != null) LandBackToHomeScreen();
    else if (Target == null) {
      setAdModalVisibility(true);
    }
    return true;
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <AdModal
        AdModalVisibility={AdModalVisibility}
        setAdModalVisibility={val => setAdModalVisibility(val)}
        BannerId={FullBannerID}
      />
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.6}
          onPress={() => LandBackToHomeScreen()}>
          {Target != null && (
            <Image
              source={require('./assets/images/icons/back-icon.png')}
              style={styles.backBtnImage}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.appLogo}>Fetching Wheels</Text>
        <View style={styles.space}></View>
      </View>

      {Target && (
        // <AdMobBanner
        //   adSize="fullBanner"
        //   adUnitID={TopBannerID}
        //   testDevices={[AdMobBanner.simulatorId]}
        //   onAdFailedToLoad={error => console.error(error)}
        // />
        <BannerAd size={BannerAdSize.ADAPTIVE_BANNER} unitId={TopBannerID} />
      )}

      {Target == null && (
        <FacingMenu List={MenuList} setTarget={val => setTarget(val)} />
      )}
      {Target != null && (
        <TargetView
          Target={MenuList.filter(e => e.id == Target)[0]}
          PrimaryColor={PrimaryColor}
        />
      )}
      <View
        style={{
          alignItems: 'center',
          paddingVertical: wHeight * 0.03,
        }}>
        <BannerAd
          size={
            Target ? BannerAdSize.LARGE_BANNER : BannerAdSize.MEDIUM_RECTANGLE
          }
          unitId={BottomBannerID}
        />
      </View>
      <StatusBar animated={true} backgroundColor={PrimaryColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: wHeight,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appLogo: {
    fontFamily: 'Play-Bold',
    textAlign: 'center',
    marginVertical: STATUSBAR_HEIGHT,
    color: PrimaryColor,
    fontSize: wWidth * 0.06,
  },
  backBtn: {
    padding: wWidth * 0.02,
    width: wWidth * 0.15,
    height: wWidth * 0.15,
  },
  backBtnImage: {
    width: wWidth * 0.1,
    height: wWidth * 0.1,
  },
  space: {
    width: wWidth * 0.15,
    height: wWidth * 0.15,
  },
});
