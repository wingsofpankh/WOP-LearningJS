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

const CustomCombineText = (props) => {
  const {
    placeholder,
    value,
    leftTextStyle,
    rightTextStyle,
    titleWidth,
    valueWidth,
  } = props;

  return (
    <View style={styles.viewInputContainer}>
      <Text style={[leftTextStyle ? leftTextStyle : styles.textStyle, { width: titleWidth }]}>{placeholder}</Text>
      <Text numberOfLines={2} style={[rightTextStyle ? rightTextStyle : styles.textSubStyle, { textAlign: 'right', width: valueWidth }]}>{value}</Text>
    </View>
  );

};

export default CustomCombineText;

const styles = StyleSheet.create({
  viewInputContainer: {
    width: '100%',
    marginVertical: 5,
    ...R.palette.centerVertical,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {
    padding: 4,
    ...R.palette.StyleBoldLable(),
  },
  textSubStyle: {
    padding: 4,
    ...R.palette.StyleRegularLable(),
  }
});
