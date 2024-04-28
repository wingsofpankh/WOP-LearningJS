import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';
import ImageView from '../ImageView';
import {getDeviceWidth} from '@root/utility/utility';

const renderSeparator = () => {
  return <View style={styles.styleSeparator} />;
};

const renderLeftSideView = (props) => {
  const {leftButtonOnpress} = props;
  return (
    <View>
      <TouchableOpacity
        style={{height: 45, justifyContent: 'center'}}
        onPress={leftButtonOnpress}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
        {props.leftIconVisible ? (
          <ImageView
            image={R.images.header.back}
            imgStyle={styles.leftImgStyle}
          />
        ) : (
          <View></View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const renderRightSideView = (props) => {
  const {rightButtonOnPress} = props;
  return (
    <Pressable
      onPress={rightButtonOnPress}
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
      <View style={{height: 45, justifyContent: 'center'}}>
        <ImageView
          image={props.rightButtonIcon}
          imgStyle={styles.rightImgStyle}
        />
      </View>
    </Pressable>
  );
};

const Header = (props) => {
  const {useSeparator, leftIconVisible, style, rightButtonIcon} = props;

  return (
    <View style={styles.styleContainer}>
      <View style={styles.styleSubContainer}>
        <View style={styles.sideViewStyle}>
          {leftIconVisible && renderLeftSideView(props)}
        </View>
        <View style={styles.headerView}>
          <Text
            numberOfLines={1}
            allowFontScaling={true}
            minimumFontScale={0.5}
            style={styles.headerText}>
            {props.title || ''}
          </Text>
        </View>
        <View style={styles.sideViewStyle}>
          {rightButtonIcon && renderRightSideView(props)}
        </View>
      </View>
      {/* {useSeparator && renderSeparator()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  styleContainer: {
    height: U.utility.getOS() == 'ios' ? 45 : 56,
    width: '100%',
  },
  styleSubContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewUnderline: {
    backgroundColor: R.colors.white,
    width: 20,
    height: 2,
    position: 'absolute',
    left: 0,
    bottom: -5,
  },
  headerView: {
    width: getDeviceWidth() * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...R.palette.StyleText(
      R.colors.themeColor.secondaryColor,
      R.palette.FontSizes.Large,
      undefined,
      R.palette.FontFamily.RalewayBold,
    ),
  },
  sideViewStyle: {
    width: 20,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImgStyle: {
    paddingLeft: 20,
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  rightImgStyle: {
    paddingRight: 20,
    height: 25,
    width: 15,
    resizeMode: 'contain',
  },
  styleSeparator: {
    marginTop: 10,
    height: 0.5,
    backgroundColor: R.colors.black60,
    width: '100%',
  },
});

export default Header;
