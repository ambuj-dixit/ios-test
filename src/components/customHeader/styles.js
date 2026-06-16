import {StyleSheet} from 'react-native';
import {scale} from '../../styles/scalingUtils';
import {halfIndent, indent, width} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  parent: {
    // paddingRight: 15,
    width: width * 0.95, // Reduced width slightly
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    height: indent * 3.2, // Shorter header height
  },
  heading: {
    fontWeight: 'bold',
    fontSize: fontSizes.xmedium,
    color: colors.black,
  },
  uniLogo: {
    width: '50%', // Slightly smaller
    height: indent * 1.8, // Reduced height
    resizeMode: 'contain',
    marginVertical: 2,
    marginLeft: 5,
  },
  drawerImage: {
    height: indent * 3,
    width: indent * 2,
  },
  bellIcon: {
    height: indent * 1.75,
    width: indent * 1.75,
  },
  attedanceIcon: {
    marginRight: halfIndent,
  },
  drawerImageContainer: {
    paddingLeft: 13,
  },
  noOfNotifications: {
    textAlign: 'center',
    color: colors.white,
    fontSize: scale(10),
    fontWeight: 'bold',
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: indent,
  },
  flexHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
