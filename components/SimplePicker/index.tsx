import React from 'react';
import Modal from 'react-native-modal';
import {R} from '@root/res';
import {
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  View,
  StyleProp,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import {U} from '@root/utility';
import CustomButton from '../CustomButton';

export interface Props {
  title?: string;
  data: Array<any>;
  callback: () => void;
  onTouchOutside: () => void;
  visible: boolean;
  allowMultiple?: false;
  doneButtonText?: string;
  onDone?: () => void;
  bottomView?: any;
  mainView?: any;
  viewStyle?: StyleProp<ViewStyle>;
  customStyle?: StyleProp<ViewStyle>;
  isNewDesign?: false;
}

const SimplePicker = ({
  title = '',
  data = [],
  callback = () => {},
  onTouchOutside = () => {},
  visible = false,
  allowMultiple = false,
  doneButtonText = R.strings.ButtonTitle.done.toUpperCase(),
  onDone = () => {},
  bottomView = null,
  mainView = null,
  viewStyle = null,
  customStyle = null,
  isNewDesign = false,
  ...props
}: Props) => {
  const styles = StyleSheet.create({
    modelTitle: {
      ...R.palette.StyleBoldLable(R.palette.FontSizes.Medium,R.colors.darkGrey),
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: isNewDesign ? 20 : 10,
    },
    styleView: viewStyle ?? {
      backgroundColor: R.colors.white,
      borderRadius: isNewDesign ? 10 : 10,
    },
    modelStyle: customStyle
      ? customStyle
      : isNewDesign
      ? {
          justifyContent: 'flex-end',
          margin: 0,
        }
      : {
          justifyContent: 'center',
        },
  });

  const renderItem = (item) => {
    let selected = false;
    if (allowMultiple) {
      selected = item.isChecked;
    }
    return (
      <TouchableWithoutFeedback
        // underlayColor={R.colors.black20}
        onPress={() => {
          callback(item);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor:
              item.checkedItem && item.checkedItem == item.id
                ? R.colors.Light.primary20
                : R.colors.white,
            borderRadius: 10
          }}>
          {allowMultiple && (
            <CustomButton
              isIconButton={true}
              disabled={true}
              style={{marginRight: 0, padding: 0}}
              icon={<View />}
              height={30}
            />
          )}
          <Text
            style={[
              R.palette.StyleRegularLable( R.palette.FontSizes.Medium),
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderBottomView = () => {
    if (bottomView) {
      return bottomView;
    } else {
      return null;
    }
  };

  const renderView = () => {
    if (mainView) {
      return mainView;
    } else {
      return (
        <View style={[styles.styleView]}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.modelTitle}>{title}</Text>
            {isNewDesign && (
              <CustomButton
                isIconButton={true}
                icon={R.images.icons.downArrow}
                tintColor={R.colors.black}
                height={30}
                resizeMode={'contain'}
                style={{position: 'absolute', right: 15}}
                onPress={onTouchOutside}
              />
            )}
            {isNewDesign && (
              <View
                style={{
                  height: 1,
                  backgroundColor: R.colors.Light.primaryLightGrey,
                }}
              />
            )}
          </View>
          <FlatList
            data={data}
            style={{maxHeight: U.utility.getDeviceHeight() * 0.7}}
            bounces={true}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
          {renderBottomView()}
          {allowMultiple && (
            <View style={{flexDirection: 'row'}}>
              <CustomButton
                height={50}
                tintColor={R.colors.black}
                title={doneButtonText.toUpperCase()}
                labelStyle={[
                  R.palette.StyleText(
                    R.colors.black,
                    R.palette.FontSizes.Large,
                    'bold',
                  ),
                ]}
                onPress={onDone}
                style={{paddingHorizontal: 20}}
              />
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <Modal
      isVisible={visible}
      deviceHeight={U.utility.getDeviceHeight()}
      deviceWidth={U.utility.getDeviceWidth()}
      onBackButtonPress={onTouchOutside}
      onBackdropPress={onTouchOutside}
      style={styles.modelStyle}
      {...props}>
      <SafeAreaView>{renderView()}</SafeAreaView>
    </Modal>
  );
};

export default SimplePicker;
