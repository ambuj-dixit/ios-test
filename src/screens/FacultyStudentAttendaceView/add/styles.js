import {StyleSheet, Dimensions} from 'react-native';
import {indent} from '../../../styles/dimensions';
import {colors, fontSizes} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerImage: {
    height: indent * 1.5,
    width: indent * 1.5,
    transform: [{rotate: '180deg'}],
  },
  cardheader: {
    flexDirection: 'row',
  },
  view: {
    color: colors.blue,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  firsRow: {
    borderBottomWidth: 1,
    paddingBottom: indent / 2,
    marginBottom: indent / 2,
  },
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  attendaceText: {
    marginLeft: indent * 1.5,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: indent,
  },
  mainview: {
    marginTop: indent * 3,
    flex: 1,
  },
  SubjectName: {
    color: colors.black,
    fontWeight: 'bold',
    width: '85%',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
    width: '100%',
  },
  card: {
    width: '90%',
    flexDirection: 'column',
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    marginBottom: indent,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Set a very light background color inside the card
  },
});

export default styles;
