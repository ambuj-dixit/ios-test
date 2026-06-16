import {StyleSheet} from 'react-native';
import {halfIndent, indent, width} from '../../styles/dimensions';
import {colors, fontSizes} from '../../styles';

const styles = StyleSheet.create({
  parent: {
    paddingRight: 15,
    width,
    flexDirection: 'row',
    backgroundColor: colors.blue,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: halfIndent,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: fontSizes.xmedium,
    color: colors.black,
  },
  uniLogo: {
    width: '70%',
    height: indent * 3,
    resizeMode: 'contain',
    marginVertical: 15,
  },
  drawerImage: {
    height: indent * 1.5,
    width: indent * 1.5,
    tintColor: colors.white,
  },
  bellIcon: {
    height: indent * 3,
    width: indent * 2,
  },
  drawerImageContainer: {
    paddingLeft: 13,
  },
  noOfNotifications: {
    textAlign: 'center',
    color: colors.white,
  },
  badgeView: {
    backgroundColor: colors.red,
    position: 'absolute',
    right: 0,
    top: 10,
    height: 18,
    width: 15,
    borderRadius: 10,
  },

  flexHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
