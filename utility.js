import {Platform, Alert, Dimensions, Linking} from 'react-native';
import {A} from '../apiManager';
import {R} from '../res';
import NavigationService from './NavigationService';
import {WToast, WSnackBar} from 'react-native-smart-tip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {decode} from 'html-entities';
import {email} from 'react-native-email';
import queryString from 'query-string';

export const getDeviceWidth = () => {
  return Math.round(Dimensions.get('window').width);
};

export const getDeviceHeight = () => {
  return Math.round(Dimensions.get('window').height);
};

export const getAccessToken = () => {
  return global.AccessToken;
};
export const setAccessToken = (value) => {
  global.AccessToken = value;
};

export const getUser = () => {
  return global.User;
};

export const setFingerprint = (value) => {
  global.Fingerprint = value;
};

export const getFingerprint = () => {
  return global.Fingerprint == null || global.Fingerprint == undefined
    ? (global.Fingerprint = false)
    : global.Fingerprint;
};

export const setUser = async (value) => {
  console.log('User Value SS', value);
  global.User = value;
};

export const getCurrentRoll = () => {
  return global.CurrentRoll;
};
export const setCurrentRoll = (value) => {
  global.CurrentRoll = value;
};

export const getMarkAttendance = () => {
  return global.attendance;
};
export const setMarkAttendance = (value) => {
  global.attendance = value;
};

export const getGroups = () => {
  return global.sabaqGroups;
};
export const setGroups = (value) => {
  global.sabaqGroups = value;
};

export function urlParse(str) {
  var args = [].slice.call(arguments, 1);
  var i = 0;
  return str.replace(/%s/g, () => args[i++]);
}

export const storeUserData = async (data) => {
  if (data.id && data.id > 0) {
    global.questions = [];
    setUser(data);
    setAccessToken(data.token);

    await AsyncStorage.setItem(
      R.globals.keys.KEY_USER_DATA,
      JSON.stringify(data),
      (error, result) => {
        if (!error) {
          console.log('storeUserData success: ', result);
        } else {
          console.log('storeUserData error: ', error);
        }
      },
    );
  }
};

export const setFingerprintData = (data) => {
  setFingerprint(data);

  AsyncStorage.setItem(
    R.globals.keys.KEY_FINGERPRINT,
    JSON.stringify(data),
    (error) => {
      if (!error) {
        console.log('fingerprint success: ' + error);
      } else {
        console.log('fingerprint error: ' + error);
      }
    },
  );
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(R.globals.keys.KEY_USER_DATA);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
export const getFingerprintData = async () => {
  try {
    setFingerprint(JSON.parse(jsonValue));
    const jsonValue = await AsyncStorage.getItem(
      R.globals.keys.KEY_FINGERPRINT,
    );
    return jsonValue != null ? JSON.parse(jsonValue) : false;
  } catch (e) {
    console.log(e);
  }
};
export const clearUserData = () => {
  AsyncStorage.multiRemove(
    [
      R.globals.keys.KEY_USER_DATA,
      R.globals.keys.KEY_DEVICE_TOKEN,
      R.globals.keys.KEY_FINGERPRINT,
    ],
    (error) => {
      console.log('succes clearUserData: ', error);
      if (!error) {
        NavigationService.navigate('Auth');
      } else {
        console.log('clearUserData: ', error);
      }
    },
  );

  setUser(undefined);
  setAccessToken(undefined);
};

export const getOS = () => {
  if (Platform.OS === 'ios') {
    return 'ios';
  }
  return 'android';
};

export const alertOkButton = {
  text: 'Ok',
  onPress: () => console.log('OK Pressed'),
};

export const alertCancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
};

export const showAlert = (
  title = R.Brand.companyName,
  message,
  buttons = [alertOkButton],
) => {
  Alert.alert(title, message, buttons, {
    cancelable: false,
  });
};

export const showMessage = (text, center) => {
  WToast.show({
    data: text,
    textColor: R.colors.white,
    duration: WToast.duration.SHORT,
  });
};

export const showMessageAtCenter = (text) => {
  WToast.show({
    data: text,
    backgroundColor: R.colors.Light.primaryBG,
    textColor: R.colors.white,
    duration: WToast.duration.SHORT,
    position: WToast.position.TOP,
  });
};

export const showSnakeBar = (text) => {
  WSnackBar.show({
    data: text,
    backgroundColor: R.colors.Light.primaryBG,
    textColor: R.colors.white,
    duration: WToast.duration.SHORT,
  });
};

export const handleError = (error, displayAlert = true) => {
  console.log('error here', error);
  setTimeout(() => {
    var message = '';
    console.log('error message ', error);
    if (error.data) {
      if (error.data.data.code === 401) {
        // showMessage(A.errors(401));
        // alert(error.data.data.message);
        showMessage(error.data.data.message);
        clearUserData(() => {});
        NavigationService.navigate('Auth');
        return;
      }
      message = error.data.data ? error.data.data.message : undefined;
      if (!message || message != undefined) {
        //Toast.show(error.data.data.message);

        message = error.data.data.message;
        showMessage(error.data.data.message);
      }
    } else if (error.message) {
      // If no data comes still this get hits. Reason: from backend empty list not handled
      // message = A.errors(0);
      // message =
      //   'Could not connect to the server. Please check your internet connection and try again';
    } else {
      message = JSON.stringify(error);
    }
    if (displayAlert) {
      showMessage(message);
    }
  }, 500);
};

export const logEvent = async (name, params) => {
  await analytics().logEvent(name, params);
  console.log('Analytics Log', name, params);
};

export const getFetch = async (fetchURL) => {
  NetInfo.fetch().then((state) => {
    if (state.isConnected == false) {
      Alert.alert(
        'Connection Error',
        'Please check your internet connection',
        [{text: 'OK', onPress: () => getFetch()}],
        {cancelable: false},
      );
      return true;
    }
  });

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${global.AccessToken}`,
  };
  try {
    console.log('SS Token:', global.AccessToken);
    console.log('SS URL:', fetchURL);

    const fetchCall = await fetch(fetchURL, {
      method: 'GET',
      headers: headers,
    });
    const responseData = await fetchCall.json();
    console.log('SS Response:', JSON.stringify(responseData));

    return responseData;

  } catch (error) {
    console.log('catchError SS', error);
  }
};

export const handleError2 = (error) => {
  console.log('error here SS', error);
  setTimeout(() => {
    showMessage(error);
  }, 500);
};

export const decodeString = (value) => {
  return decode(value);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const appendSuffix = (num = 1) => {
  let suffix = 'th';
  if (num == 0) suffix = '';
  if (num % 10 == 1 && num % 100 != 11) suffix = 'st';
  if (num % 10 == 2 && num % 100 != 12) suffix = 'nd';
  if (num % 10 == 3 && num % 100 != 13) suffix = 'rd';

  return num + suffix;
};

export const dialCall = (number) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${' + number + '}';
  } else {
    phoneNumber = 'telprompt:${' + number + '}';
  }
  Linking.openURL(phoneNumber);
};

export const sendEmail = (newemail) => {
  Linking.openURL('mailto:' + newemail);
};

export const handleEmail = (newEmail) => {
  if (Platform.OS === 'android') {
    const to = [newEmail]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: ['', ''], // string or array of email addresses
      bcc: '', // string or array of email addresses
      subject: '',
      body: '',
    }).catch(console.error);
  } else {
    Linking.openURL('mailto:message:jaydeep@sodainmind.com');
  }
};

export const openGoggleMap = (
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  Label,
) => {
  const latitude = LATITUDE;
  const longitude = LONGITUDE;
  const latitudeDelta = LATITUDE_DELTA;
  const longitudeDelta = LONGITUDE_DELTA;
  const label = Label;

  const url = Platform.select({
    ios:
      'comgooglemaps://?center=' +
      latitude +
      ',' +
      longitude +
      '&zoom=21' +
      // latitudeDelta +
      // ',' +
      // longitudeDelta +
      '?q=' +
      label,
    android:
      'geo:' +
      latitude +
      ',' +
      longitude +
      ',' +
      latitudeDelta +
      ',' +
      longitudeDelta +
      '?q=' +
      label,
  });
  console.log('Map URL:', url);
  Linking.canOpenURL(url).then((canOpen) => {
    if (canOpen) {
      Linking.openURL(url);
      console.log('open google maps');
    } else {
      showAlert(undefined, 'Please install Google Maps');
    }
  });
};

export const removeTags = (str) => {
  if (str === null || str === '') return false;
  else str = str.toString();
  var newStr = str.replace(/(<([^>]+)>)/gi, '');
  // console.log('Normal text SS', newStr);
  return newStr;
};

export const getBranchData = async () => {
  const response = await AsyncStorage.getItem(R.globals.keys.KEY_BRANCH_DATA);
  let branch_data = JSON.parse(response);
  console.log('Branch Data SS', branch_data);
  return branch_data;
};

export const getAppSettingsMetaData = async () => {
  const response = await AsyncStorage.getItem(
    R.globals.keys.KEY_APP_SETTING_METADATA,
  );
  let metadata = JSON.parse(response);
  console.log('App Setting Metadata SS', metadata);
  return metadata;
};

export const getUserStatus = async () => {
  const response = await AsyncStorage.getItem(R.globals.keys.KEY_USER_VERIFY);
  let status = JSON.parse(response);
  console.log('Get User Verified Status', status);
  return status;
};

export const openWeb = (screen, url, type) => {
  console.log('Webopen SS', screen, url, type);
  NavigationService.navigate('WebBrowser', {
    screenTitle: screen,
    browserURL: url,
    type: type,
  });
};

export const getIdentifierFromURL = (url) => {
  const parsed = queryString.parseUrl(url);
  const paramCode = parsed?.query?.code ?? '';
  const paramError = parsed?.query?.error ?? '';
  console.log('Query Params Value SS', paramCode);
  let response = {code: paramCode, error: paramError};
  console.log('Query Response SS', response);
  return response;
};
