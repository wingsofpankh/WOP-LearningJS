import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {R} from '@root/res';
import ImageView from '@root/components/ImageView';
import {getDeviceHeight, getDeviceWidth} from '@root/utility/utility';
import {FontSizes} from '@root/res/palette';
import deviceInfoModule from 'react-native-device-info';

export const BottomLayout = (props) => {
  const {} = props;

  return (
    <View style={styles.bottomLayoutViewContainer}>
      <ImageView
        image={R.images.logoImages.bottomLeftImage}
        imgStyle={styles.bottomLeftImage}
      />
      <ImageView
        image={R.images.logoImages.bottomRightImage}
        imgStyle={styles.bottomRightImage}
      />
    </View>
  );
};

export const BottomLayoutVersion = () => {
  return (
    <View>
      <View style={styles.bottomContainer}>
        <View>
          <ImageView
            image={R.images.logoImages.bottomLeftImage}
            imgStyle={styles.bottomLeftImage}
          />
        </View>
        <View>
          <ImageView
            image={R.images.logoImages.bottomRightImage}
            imgStyle={styles.bottomRightImage}
          />
        </View>
      </View>
      <Text style={[styles.versionText, {}]}>
        {R.strings.Title.appVersion + (deviceInfoModule.getVersion() ?? '')}
      </Text>
    </View>
  );
};

export const BottomLayoutDashboard = (props) => {
  const {} = props;

  return (
    <View style={styles.bottomLayoutViewContainer}>
      <ImageView
        image={R.images.logoImages.bottomLeftImage}
        imgStyle={styles.bottomLeftImage}
      />
      {/* <ImageView
        image={R.images.logoImages.dashboardBottomRightImage}
        imgStyle={styles.bottomRightImage}
      /> */}
    </View>
  );
};

export const BottomLayoutMyInfo = () => {

  return (
    <View style={styles.bottomLayoutViewContainer}>
      <ImageView
        image={R.images.logoImages.bottomMyInfo}
        imgStyle={styles.bottomCenterImage}
      />
    </View>
  );
};

export const BottomLayoutRight = (props) => {
  const {} = props;

  return (
    <View style={styles.bottomLayoutRightViewContainer}>
      <ImageView
        image={R.images.logoImages.bottomRightImage}
        imgStyle={styles.bottomRightImage}
      />
    </View>
  );
};

export const BottomLayoutLeft = (props) => {
  const {} = props;

  return (
    <View style={styles.bottomLayoutLeftViewContainer}>
      <ImageView
        image={R.images.logoImages.bottomLeftImage}
        imgStyle={styles.bottomLeftImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: getDeviceWidth(),
  },
  bottomLayoutViewContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: getDeviceWidth(),
  },
  bottomLayoutRightViewContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: getDeviceWidth(),
  },
  bottomLayoutLeftViewContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: getDeviceWidth(),
  },
  bottomLeftImage: {
    height: 120,
    width: 200,
    resizeMode: 'contain',
    opacity: 0.4,
  },
  bottomRightImage: {
    height: 100,
    width: 150,
    resizeMode: 'contain',
    opacity: 0.4,
  },
  bottomCenterImage: {
    height: 100,
    width: getDeviceWidth(),
    resizeMode: 'contain',
  },
  versionText: {
    ...R.palette.StyleRegularLable(FontSizes.SubTitle),
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
