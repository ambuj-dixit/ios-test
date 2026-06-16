import {StyleSheet} from 'react-native';
import {indent, width} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  routeCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: indent * 0.6,
  },
  childCard: {
    paddingLeft: indent * 4,
  },
  parentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    // marginLeft: indent,
  },
  toggleCard: {
    justifyContent: 'space-between',
    paddingRight: indent * 2,
  },
  expandView: {
    width: '100%',
  },
  iconContainer: {
    height: '100%',
    // paddingHorizontal: 5,
    width: indent * 4,
    alignItems: 'center',
  },
  routeName: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.medium,
    // textAlignVertical: 'center',
    // flexWrap: 'wrap',
    color: colors.blue,
  },
});

export default styles;
