import {StyleSheet} from 'react-native';
import {R} from '@root/res';

const styles = StyleSheet.create({
  subContainer: {
    ...R.palette.fillParent,
    paddingTop: 20,
    alignItems:'center'
  },
  listItem: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: R.colors.white,
    marginBottom: 2,
  },
  title: {
    flexDirection: 'row',
    // backgroundColor: R.colors.Light.primaryText,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: R.palette.FontSizes.Small,
  },
  txtTitle: {
    color: R.colors.Dark.secondaryText,
    fontSize: R.palette.FontSizes.Small,
  },
  txtCompulsory: {
    color: R.colors.redTitle,
    fontSize: R.palette.FontSizes.Medium,
  },
});

export default styles;
