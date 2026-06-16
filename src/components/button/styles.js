import {colors, fontSizes, fontWeights} from '../../styles';
import {StyleSheet} from 'react-native';
import {halfIndent, indent} from '../../styles/dimensions';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: halfIndent,
    marginTop: indent * 2,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.small,
    textAlign: 'center',
    paddingVertical: halfIndent,
    fontWeight: fontWeights.bold,
  },
});

export default styles;
