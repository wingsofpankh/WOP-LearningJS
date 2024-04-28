import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { R } from '@root/res';


function Loader({ loading }) {
  return (
    <Modal
      supportedOrientations={[
        'portrait',
        'landscape',
        'landscape-left',
        'landscape-right',
        'portrait-upside-down',
      ]}
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground} visible={loading}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={R.colors.white}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  activityIndicatorWrapper: {
    height: 50,
    width: 50,
    borderRadius: 30,
    paddingLeft: Platform.OS == 'ios' ? 4 : 0,
    paddingTop: Platform.OS == 'ios' ? 3 : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default Loader;
