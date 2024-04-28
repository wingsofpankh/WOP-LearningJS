import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../res/colors';
import {getDeviceWidth} from '../res/utility';
import R from '../res';

const CustomInput = ({title, value, onChangeText, error, errorMessage}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    inputRef.current.blur();
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5, opacity: 0.5}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            borderBottomColor: error
              ? colors.red
              : isFocused
              ? colors.btnColor
              : colors.titleColor,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth() - 60,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: R.colors.titleColor,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.inputTxtColor,
  },
  error: {
    color: colors.red,
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;
