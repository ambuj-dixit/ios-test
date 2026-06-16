import {StyleSheet} from 'react-native';
import {indent} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  maleProfile: {
    marginTop: indent * 2,
    height: indent * 5,
    width: indent * 5,
    borderWidth: 0,
    borderRadius: indent * 2.5,
  },
  drawerTop: {
    gap: 10,
    marginBottom: indent * 3,
    alignItems: 'center',
  },
  userName: {
    fontSize: fontSizes.big,
    fontWeight: fontWeights.bold,
    color: colors.blue,
  },
  profiledetails: {
    fontSize: fontSizes.verySmall,
    color: colors.blue,
    flexWrap: 'wrap',
  },

  icon: {
    height: indent * 2,
    width: indent * 2,
  },
  signOutText: {
    color: colors.black,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.medium,
  },
  signOut: {
    marginTop: indent * 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: (indent * 1) / 2,
  },
  iconContainer: {
    height: '100%',
    paddingHorizontal: 5,
    width: indent * 4,
    alignItems: 'center',
  },
});

export default styles;
