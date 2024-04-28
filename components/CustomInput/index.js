import React from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import fonts from '@root/res/fonts';
import { R } from '@root/res';

const CustomInput = (props) => {
  const {
    isMultiline,
    increaseHeight,
    showHeader,
    headerTitle,
    headerStyle,
    style,
    placeholder,
    onChangeText,
    onFocus,
    onBlur,
    value,
    editable,
    underlineColorAndroid,
    autoCapitalize,
    secureTextEntry,
    showRightIcon,
    rightIconStyle,
    onPressPasswordVisibility,
    rightIcon,
    keyboardType,
    imgIconstyle,
    TextInputDisableHolder,
    onPressBtn,
    isDropDown,
    onSubmitEditing,
    length,
    returnKeyType,
    returnKeyLabel,
    blurOnSubmit,
    ref, leftTextVisible,
    leftText, leftTextStyle,
    astrikValidation
  } = props;
  if (isDropDown) {
    return (
      <View style={styles.viewInputContainer}>
        {showHeader && <Text style={headerStyle}>{headerTitle}{astrikValidation && <Text style={{ color: R.colors.red }}>*</Text>}</Text>}

        <Pressable
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          onPress={onPressBtn}
          style={style}>
          <Text
            numberOfLines={2}
            maxFontSizeMultiplier={8}
            style={[
              {
                ...R.palette.StyleText(
                  value == '' ? R.colors.darkGrey : R.colors.black,
                  R.palette.FontSizes.Medium,
                  '600',
                  R.palette.FontFamily.RalewayRegular
                ),
              },
            ]}>
            {value == '' ? placeholder : value}
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 10,
              bottom: 5,
              paddingVertical: 7,
            }}>
            <Image
              style={[
                { height: 20, width: 20, resizeMode: 'contain', marginBottom: 3 },
                imgIconstyle,
              ]}
              source={rightIcon}></Image>
          </View>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.viewInputContainer}>
        {showHeader && <Text style={headerStyle}>{headerTitle}{astrikValidation && <Text style={{ color: R.colors.red }}>*</Text>}</Text>}
        <TextInput
          editable={TextInputDisableHolder}
          multiline={isMultiline}
          style={[style,{paddingHorizontal:20,borderRadius: 10,} ?? {
            color: (value == '' ? R.colors.darkGrey : R.colors.themeColor.secondaryColor),
            fontSize: R.palette.FontSizes.Medium,
            //fontWeight: '600',
            fontFamily: R.palette.FontFamily.RalewayRegular
          }]}
          ref={ref}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          maxLength={length}
          underlineColorAndroid={underlineColorAndroid}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
          blurOnSubmit={blurOnSubmit}
        />
        {showRightIcon && (
          <Pressable
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            onPress={onPressPasswordVisibility}
            style={[rightIconStyle ?? {
              position: 'absolute',
              right: 10,
              bottom: 5,
              paddingVertical: 7,

            }]}>
            <Image
              style={[
                { height: 20, width: 20, resizeMode: 'contain' },
                imgIconstyle,
              ]}
              source={rightIcon}></Image>
          </Pressable>
        )}
        {leftTextVisible && (
          <Pressable
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            onPress={onPressPasswordVisibility}
            style={{
              position: 'absolute',
              left: 10,
              bottom: 5,
              paddingVertical: 5,
            }}>
            <Text
              style={[
                { height: 25, width: 25, fontWeight:'bold'},
                leftTextStyle
              ]}
            >{leftText}</Text>
          </Pressable>
        )}
      </View>
    );
  }
};

export default CustomInput;

const styles = StyleSheet.create({
  viewInputContainer: {
    width: '90%',
    marginVertical: 5,
    ...R.palette.centerVertical,
  },
});
