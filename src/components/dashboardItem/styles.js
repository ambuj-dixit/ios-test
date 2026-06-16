import {StyleSheet} from 'react-native';
import {scale} from '../../styles/scalingUtils';
import {halfIndent, indent, width} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: fontSizes.verySmall,
    flexWrap: 'wrap',
    marginTop: halfIndent,
    color: colors.black,
    fontWeight: '800',
  },
  userImage: {
    height: (indent * 3) / 2,
    width: (indent * 3) / 2,
    // marginTop: 10,
  },
  card: {
    paddingHorizontal: indent / 2,
    paddingVertical: indent / 2,
    // marginLeft: 15,
    // marginBottom: indent,
    // width: '28%',
    minHeight: indent * 7,
    // width: width / 3,
    width: '33.33%',
  },
  innerCard: {
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    paddingVertical: indent,
  },
  iconBg: {
    backgroundColor: colors.blue,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default styles;
