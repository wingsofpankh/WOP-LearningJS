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
import {R} from '@root/res';
import { getDeviceWidth,getDeviceHeight } from '@root/utility/utility';

const CustomRectCard = (props) => {
  const {
    placeholder,
    value,
    multiline,
    cardbgColor,
    placeholderTxtColor,
    textColor

  } = props;
  
    return (
        <View style={styles.viewInputContainer}>
            <Text style={styles.placeholderTxt}>{placeholder}</Text>
      <View style={[styles.card,{height:multiline && getDeviceHeight()/6,backgroundColor:cardbgColor?cardbgColor:R.colors.white}]}>
      <Text style={[styles.textStyle]}>{value}</Text>
      </View>
      </View>
    );
  
};

export default CustomRectCard;

const styles = StyleSheet.create({
    viewInputContainer: {
        width: '100%',
        marginVertical: 5,
        ...R.palette.centerVertical
      },
  placeholderTxt:{
        ...R.palette.StyleText(R.colors.Light.primaryTxt20, R.palette.FontSizes.Small, '600',R.palette.FontFamily.RalewayBold),
        textAlign:'left',width:getDeviceWidth()-80
      },
  textStyle:{
    ...R.palette.StyleText(R.colors.Light.primaryTxt20, R.palette.FontSizes.subTitle, '600',R.palette.FontFamily.RalewayRegular),
    textAlign:'left',width:getDeviceWidth()-80,marginTop:5,marginBottom:5
  },
  card:{
    backgroundColor:R.colors.white,
    borderRadius:10,
    marginTop:10,
    marginBottom:10,
    padding:10
},
txtHeader:{
    ...R.palette.StyleText(R.colors.Light.primaryTxt20, R.palette.FontSizes.Medium,undefined,R.palette.FontFamily.RalewayBold),
    textAlign:'left'
}
});
