import {StyleSheet} from 'react-native';
import {scale} from '../../styles/scalingUtils';
import {indent, width} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  parent: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.placeholder,
    paddingVertical: indent / 2,
    paddingRight: 10,
  },
  drawerImage: {
    height: indent * 2,
    width: indent,
  },
  titleView: {
    // width: width / 3,
  },
  bellIcon: {
    height: indent * 1.75,
    width: indent * 1.75,
  },
  title: {
    color: colors.black,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  drawerImageContainer: {
    paddingLeft: 13,
    // width: width / 3,
  },
  noOfNotifications: {
    textAlign: 'center',
    color: colors.white,
  },
  badgeView: {
    backgroundColor: colors.red,
    position: 'absolute',
    right: -2,
    top: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  },
});

export default styles;
