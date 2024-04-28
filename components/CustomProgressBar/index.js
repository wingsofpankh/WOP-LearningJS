import React from 'react';
import { Modal, View, Text, ActivityIndicator,StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';

const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible}>
      <View style={styles.styleContainer}>
        <View style={styles.modal}>
          <Text style={styles.loadingText}>Please wait...</Text>
          <ActivityIndicator color={R.colors.blue} size="large" />
        </View>
      </View>
    </Modal>
  );
  const styles = StyleSheet.create({

    styleContainer: {
        flex: 1,
        backgroundColor: R.colors.black60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 25
    },
    loadingText: {
        ...R.palette.StyleText(
          R.colors.black,
          R.palette.FontSizes.Medium,
          undefined,
          R.palette.FontFamily.RalewayBold,
        ),
        padding:10
    },
    
  });
  export default CustomProgressBar;