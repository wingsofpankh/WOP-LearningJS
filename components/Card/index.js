import React from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import fonts from '@root/res/fonts';
import {R} from '@root/res';
import {getDeviceHeight, getDeviceWidth} from '@root/utility/utility';
import {U} from '@root/utility';

const Card = (props) => {
  const {cardImage, imgIconstyle, cardTitle, cardStyle, onPress} = props;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        {/* <View style={styles.viewInputContainer}> */}
        <Image
          style={[
            {
              height: Platform.OS == 'ios' ? 40 : 50,
              width: Platform.OS == 'ios' ? 40 : 50,
              // height: (U.utility.getDeviceWidth()/4),
              // width: (U.utility.getDeviceWidth()/4),
              resizeMode: 'contain',
            },
            imgIconstyle,
          ]}
          source={cardImage}></Image>
        {/* </View> */}
        <Text style={styles.text}>{cardTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth() / 3,
    height: getDeviceWidth() / 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  viewInputContainer: {
    //    shadowColor: 'black',
    //     shadowOpacity: 0.27,
    //     shadowOffset: { width: 0, height: 5},
    //     shadowRadius: 10,
    //     elevation: 3,
  },
  text: {
    width: 150,
    textAlign: 'center',
    ...R.palette.StyleRegularLable(
      R.palette.FontSizes.Small,
    ),
    marginTop: Platform.OS == 'ios' ? '12%' : '5%',
  },
  button: {
    //shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    textShadowOffset: {height: 0, width: 0},
    shadowColor: R.colors.black,
    shadowRadius: U.utility.getOS() === 'ios' ? 1 : 3,
    shadowOpacity: U.utility.getOS() === 'ios' ? 0.08 : 3,
    elevation: 3,
    
    backgroundColor: R.colors.white,
    //flex:1,

    width: getDeviceWidth() / 3.5,
    height: getDeviceWidth() / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
