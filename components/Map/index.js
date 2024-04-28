import { C } from '@root/components';
import { R } from '@root/res';
import React from 'react';
import { View, Text, FlatList,ScrollView,Image } from 'react-native';
import ImageView from '@root/components/ImageView';
import { U } from '@root/utility';
import {getDeviceWidth} from '@root/utility/utility';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Map = () => {
 
    return (
      <View style={[R.palette.StyleContainer(R.colors.white)]}>
        {/* <C.Header
          title={'Get Loan'}
          leftButtonOnpress={() => U.NavigationService.goBack()}
          isRightBtnDisable={true}
          leftIconVisible={true}
          useSeparator={true}
          rightButtonIcon={null}
          /> */}
           <MapView
                    //   customMapStyle={styles.imageStyle}
                    provider={PROVIDER_GOOGLE}
                    // customMapStyle={[{flex:1,width:getDeviceWidth()/2,height:200,}]}
                    />
        {/* <View style={R.palette.StyleContainer()}>{this.renderView()}</View> */}
       
      </View>
    );
}

export default Map;