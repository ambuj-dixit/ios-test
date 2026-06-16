import {StyleSheet, Dimensions} from 'react-native';
import {halfIndent, indent, width} from '../../../styles/dimensions';
import {colors, fontSizes} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 5,
  },
  resetButton: {
    backgroundColor: colors.black4,
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    zIndex: 99999,
    marginBottom: 5,
    flex: 1,
  },
  resetButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.placeholder,
    height: 35,
    borderRadius: halfIndent / 2,
    paddingHorizontal: halfIndent,
    color: colors.black,
    width: '50%',
  },
  cardTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sectionText: {
    fontSize: fontSizes.verySmall,
    color: colors.placeholder,
    textAlign: 'right',
  },
  checkbox: {
    padding: 0,
    height: indent,
    width: indent,
  },
  sortDropdown: {
    width: width * 0.3,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: halfIndent / 2,
    paddingLeft: halfIndent,
    height: indent * 2,
  },
  drawerImage: {
    height: indent * 1.5,
    width: indent * 1.5,
    transform: [{rotate: '180deg'}],
  },
  sortDropdownText: {
    color: colors.black,
    fontSize: fontSizes.veryVerySmall,
  },
  cardheader: {
    flexDirection: 'row',
  },
  markAttView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  studentCardHeading: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.black,
    width: '75%',
  },
  noData: {
    color: colors.black,
    textAlign: 'center',
    fontSize: fontSizes.medium,
    marginTop: 65,
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
    marginTop: indent * 1.5,
    flex: 1,
    paddingHorizontal: indent,
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
    backgroundColor: '#f0f0f0', 
  },
  btnFilterView: {
    flexDirection: 'row',
    marginBottom: indent,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  btnFilter: {
    width: 45,
    backgroundColor: colors.blue,
    borderRadius: 3,
    height: indent * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSizes.small,
  },

  // Student Card
  cardMain: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    padding: 20,
    marginBottom: 7,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default styles;
