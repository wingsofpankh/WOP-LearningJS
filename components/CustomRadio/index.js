import React from 'react';
import {R} from '@root/res';
import {View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {U} from '@root/utility';
import {TouchableOpacity} from 'react-native'

const CustomRadio = (props) => {
  const {checked, onPressChecked, name} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        height: U.utility.getOS() == 'ios' ? 50 : 35,
        marginTop: U.utility.getOS() == 'ios' ? -15 : null,
      }}>
      {/* <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        size={20}
        onPress={onPressChecked}
      /> */}
      <TouchableOpacity
        onPress={onPressChecked}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: R.colors.themeColor.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {checked && (
            <View
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: R.colors.themeColor.primaryColor,
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text
        style={[
          R.palette.StyleText(R.colors.themeColor.secondaryColor, R.palette.FontSizes.Medium,'600',R.palette.FontFamily.RalewayRegular),
          {paddingRight: 20,paddingLeft:12},
        ]}>
        {name}
      </Text>
    </View>
  );
};

export default CustomRadio;
