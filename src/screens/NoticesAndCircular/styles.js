import {StyleSheet} from 'react-native';
import {indent} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: indent,
    width: '100%',
    justifyContent: 'space-between',
  },
  downloadIcon: {
    marginLeft: indent,
    height: indent,
    width: indent * 2,
  },
  noticeScroll: {
    paddingBottom: indent * 3,
  },
  card: {
    backgroundColor: colors.white,
    marginBottom: indent,
    paddingHorizontal: indent,
    elevation: 10,
    borderRadius: 10,
    shadowRadius: 0,
    paddingVertical: indent,
  },
  attachedFile: {
    color: colors.blue,
    fontWeight: fontWeights.bold,
    textDecorationLine: 'underline',
    width: '70%',
    // marginTop: indent,
  },
  cardContainer: {
    marginTop: indent * 2,
  },
  cardTitle: {
    color: colors.red,
    fontSize: fontSizes.xmedium,
    marginBottom: indent / 2,
  },
  subTitle: {
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: indent / 2,
  },
  postedOn: {
    color: colors.placeholder,
  },
});

export default styles;
