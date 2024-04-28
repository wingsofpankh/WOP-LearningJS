import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageView = (props) => {
  return <Image source={props.image} style={props.imgStyle} />;
};

export default ImageView;
