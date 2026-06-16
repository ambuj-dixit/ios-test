import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import {doubleIndent, halfIndent, indent} from '../../styles/dimensions';

import {colors, fontSizes, fontWeights} from '../../styles';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    height: '100%',
  },
  totalPaidText: {
    color: colors.black,
    fontWeight: fontWeights.bold,
  },
  amount: {
    color: colors.black,
  },
  payButton: {
    backgroundColor: 'green',
    paddingHorizontal: indent,
    marginTop: 0,
  },
  addButton: {
    backgroundColor: colors.blue,
  },
  bottomView: {
    paddingHorizontal: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: doubleIndent,
    marginTop: indent,
  },
  deleteButton: {
    backgroundColor: colors.red,
    marginTop: 0,
    paddingHorizontal: indent,
    alignSelf: 'center',
  },
  noSubject: {
    color: colors.black,
    textAlign: 'center',
  },
  inputcontainer: {
    padding: indent,
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    color: colors.blue,
  },
  subheading: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    color: colors.blue,
  },
  formheading: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  inputitems: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    padding: 20,
    marginTop: indent * 1,
    fontSize: 20,
  },

  labels: {
    marginTop: indent * 1,
    fontSize: fontSizes.veryVerySmall,
    fontWeight: fontWeights.bold,
    color: '#6e6e6e',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    backgroundColor: '#e3e6ea',
    color: colors.black,
    marginVertical: 5,
    paddingHorizontal: halfIndent,
    paddingVertical: halfIndent,
    fontSize: fontSizes.verySmall,
  },
  subjectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    paddingHorizontal: halfIndent,
    backgroundColor: '#e3e6ea',
    marginVertical: 5,
    borderRadius: 5,
    color: colors.black,
  },
  dropdownSelectedText: {
    fontSize: fontSizes.verySmall,
    color: colors.black,
  },
  btn: {
    marginTop: 15,
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 15,
  },
  btnText: {
    color: colors.white,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  cardsection: {
    marginHorizontal: indent,
  },
  cardheading: {
    fontSize: fontSizes.verySmall,
    marginVertical: 15,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  card: {
    backgroundColor: '#f7f7f7',
    gap: 10,
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    padding: 20,
  },

  subjectCard: {
    marginBottom: halfIndent,
  },

  nameheading: {
    fontSize: fontSizes.verySmall,
    marginRight: indent,
  },
  name: {
    fontSize: fontSizes.verySmall,
    fontWeight: 'bold',
    color: colors.black,
  },
  paidSubjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportButton: {
    color: colors.blue,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginRight: halfIndent,
  },
  downloadButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  downloadReceipt: {
    marginLeft: halfIndent,
    height: indent * 1.5,
    width: indent * 1.5,
  },
  downloadText: {
    color: colors.blue,
  },
  itemss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
export default styles;
