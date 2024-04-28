import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
  BackHandler,
  Linking
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import styles from './styles';
import ShakingText from './ShakingText';
import { Emitter, events } from '@root/res/global';
import { U } from '@root/utility';
import AndroidOpenSettings from 'react-native-android-open-settings';
import RNExitApp from 'react-native-exit-app';
import Modal from 'react-native-modal';


// Based on https://github.com/hieuvp/react-native-fingerprint-scanner/blob/master/examples/src/FingerprintPopup.component.android.js
// - this example component supports both the legacy device-specific (Android < v23) and
//   current (Android >= 23) biometric APIs
// - your lib and implementation may not need both

class BiometricPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined,
      fallBackErr: false,
      isOtpModal: false,
      errormsg: ''
    };

    this.description = null;
  }

  componentDidMount() {
    if (this.requiresLegacyAuthentication()) {
      this.authLegacy();
    } else {
      this.authCurrent();
    }
  }

  componentWillUnmount = () => {
    FingerprintScanner.release();
  };

  requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }

  authCurrent2() {
    // this.setState({
    //   fallBackErr: true
    // })
    this.authCurrent()
  }

  openSetting = async () => {
    console.log(' AndroidOpenSettings.securitySettings()', AndroidOpenSettings)
    AndroidOpenSettings.generalSettings();
    RNExitApp.exitApp()     // U.NavigationService.navigate('CancelScreen');
  }

  authCurrent() {
    FingerprintScanner.authenticate({
      description: this.props.description || 'Log in with fingerprint',
    })
      .then(() => {
        Emitter.emit(events.isFingerprint, true);
        U.NavigationService.navigate('App')
        global.Errormessage = "Fingerprint Authentication Authenticated successfully";
        console.log('Fingerprint authentication success')
        // Alert.alert(
        //   'Fingerprint Authentication',
        //   'Authenticated successfully',
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => global.isGotoHomeFingerPrint ? U.NavigationService.navigate('App') : console.log('success'),
        //     },
        //   ],
        // );
        // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        Emitter.emit(events.isFingerprint, {
          isFingerprint: false,
        });
        global.Errormessage = error.message;
        console.log('Fingerprint authentication cancelled')

        if (error.message == 'Authentication could not start because Fingerprint Scanner has no enrolled fingers.') {
          // U.NavigationService.navigate('App')
          if (Platform.OS == 'ios') {

          } else {
            Alert.alert(
              '',
              'You do not have fingerprint registered on your phone. Go to phone settings and register for Touch Id.',
              [

                { text: "SETTING", onPress: () => this.openSetting(error) },
                { text: "CANCEL", onPress: () => RNExitApp.exitApp() }

                // AndroidOpenSettings.securitySettings()
                ,
                // { text: "OK", onPress: () => this.setState({ imageUrl: '' }) }

              ],
              // { cancelable: true }
            );
          }
        }
        // authCurrent()
        this.setState({
          errormsg: error.message
        })
        // Alert.alert('Fingerprint Authentication', error.message);
        if (error.message == 'Authentication was canceled by the user - e.g. the user tapped Cancel in the dialog.') {
          BackHandler.exitApp();
          return;
        }

        if (error.message == 'Authentication was canceled because the user tapped the fallback button (Enter Password).') {
          U.NavigationService.navigate('CancelScreen');
        }
        if (error.message == 'Authentication was canceled by system - e.g. if another application came to foreground while the authentication dialog was up.') {
          U.NavigationService.navigate('CancelScreen');
        }

        if (error.message == 'Authentication was not successful, the device currently in a lockout of 30 seconds.') {
          U.NavigationService.navigate('CounterScreen', { errmsg: error.message })
        }



        if (error.message == 'Authentication was not successful, device must be unlocked via password.') {
          Alert.alert(
            'Error',
            error.message,
            [
              {
                text: "OK", onPress: () => BackHandler.exitApp()
              }
            ],
            // { cancelable: true }
          );
        }

        'when faceon and fallbackbutton', 'Authentication was canceled because the user tapped the fallback button (Enter Password).'
        'when fingeron and fallbackbutton', 'Authentication was canceled because the user tapped the fallback button (Enter Password).'
        'when faceon & finegron and fallbackbutton', 'Authentication was canceled because the user tapped the fallback button (Enter Password).'

        console.log('fingerprint error', error)
        // alert(error)
        // U.NavigationService.navigate('App')
      });
  }

  authLegacy() {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        this.props.handlePopupDismissedLegacy();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        this.setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });

        this.description.shake();
      });
  }

  handleAuthenticationAttemptedLegacy = (error) => {
    this.setState({ errorMessageLegacy: error.message });
    this.description.shake();
  };

  renderLegacy() {
    const { errorMessageLegacy, biometricLegacy, errormsg } = this.state;
    const { style, handlePopupDismissedLegacy } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType={'slide'}
          isVisible={this.state.isOtpModal}
          onBackButtonPress={() => this.setState({ isOtpModal: false })}
        // onBackdropPress={() => this.setState({ isOtpModal: false })}
        >
          <View style={{
            height: getDeviceHeight() - 190,
            width: getDeviceWidth() - 60,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: R.colors.white
          }}>
            <Text
              style={[
                R.palette.StyleText(
                  R.colors.black,
                  R.palette.FontSizes.Medium,
                  undefined,
                  R.palette.FontFamily.RalewayBold,
                ),
                { paddingVertical: 15 },
              ]}>
              counter
              {/* {counter == 60 ? "1.00" : "00:" + (counter == 0 ? '00' : counter)} */}
            </Text>
          </View>
        </Modal>
        <View style={[styles.contentContainer, style]}>
          <Text style={styles.heading}>Biometric{'\n'}Authentication</Text>
          <ShakingText
            ref={(instance) => {
              this.description = instance;
            }}
            style={styles.description(!!errorMessageLegacy)}>
            {errorMessageLegacy ||
              `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissedLegacy}>
            <Text style={styles.buttonText}>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render = () => {
    if (this.requiresLegacyAuthentication()) {
      return this.renderLegacy();
    }

    // current API UI provided by native BiometricPrompt
    return null;
  };
}

BiometricPopup.propTypes = {
  description: PropTypes.string,
  handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
};

export default BiometricPopup;
