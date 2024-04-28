import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Modal, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <Modal visible={true} transparent={true} animationType={'fade'}>
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
      {/* <View style={{ flex: 1, alignItems: 'center',}}>   */}
      {/* <Text style={{color:'black',fontSize:30}}>No Internet Connection</Text> */}
      {/* </View> */}
    </Modal>
  );
}

class NetworkInfo extends PureComponent {
  state = {
    isConnected: true,
    Alert_Visibility: true,
  };

  componentDidMount() {
    this.eventUnSubscriber = NetInfo.addEventListener(
      this.handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    if (this.eventUnSubscriber) {
      this.eventUnSubscriber();
    }
    // NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (state) => {
    console.log('is network connected', state);
    this.setState({ isConnected: state.isConnected });
    if (!this.state.isConnected) {
      // alert('please connect to network')
      Alert.alert(
        'Alert',
        'please connect to network',
        [
          // { text: "Cancel", onPress: () => this.requestForProfile() },
          {
            text: "OK", onPress: () => { }
          }

        ],
        { cancelable: true }

      );
    } else {
      null
    }
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    // top: 30
  },
  offlineText: { color: '#fff' },
});

export default NetworkInfo;
