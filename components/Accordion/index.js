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
import ImageView from '@root/components/ImageView';

const CustomCombineText = (props) => {
  const {
    placeholder,
    value,
  } = props;
  
    return (
      <View style={styles.viewInputContainer}>
      <Text style={[styles.textStyle,{width:'45%'}]}>{placeholder}</Text>
      <ImageView
                image={R.images.logoImages.brand}
                imgStyle={{
                  height: 110,
                  width: 220,
                  marginBottom: 30,
                  resizeMode: 'contain',
                }}
              />    
                </View>
    );
  
};

export default CustomCombineText;

const styles = StyleSheet.create({
  viewInputContainer: {
    width: '100%',
    marginVertical: 5,
    ...R.palette.centerVertical,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textStyle:{
      padding:4,
    ...R.palette.StyleText(R.colors.darkGrey, R.palette.FontSizes.Small, '600',R.palette.FontFamily.RalewayRegular),
  }
});
