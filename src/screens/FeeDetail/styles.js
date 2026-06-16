import {StyleSheet, Dimensions, Platform} from 'react-native';

import {halfIndent, indent} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height,
    width,
  },
  helperText: {
    color: colors.blue,
    fontSize: fontSizes.small,
    // fontStyle: 'italic',
    fontWeight: 'bold',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoRow: {
    flexDirection: 'row',
    // gap: 10
    justifyContent: 'space-between',
    padding: 5,
  },
  FeeHeadName: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: fontSizes.small,
    // textDecorationLine: 'underline',
    padding: 5,
  },
  container: {
    height: '100%',
  },
  voucherItem: {
    padding: halfIndent,
    marginVertical: halfIndent / 2,
    marginHorizontal: halfIndent,
    backgroundColor: colors.white,
    shadowColor: '#00000077',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 4,
    elevation: 2,
  },
  modalRoot: {
    backgroundColor: '#00000040',
    flex: 1,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    padding: 10,
  },
  mainContainer: {
    borderRadius: 15,
  },
  closeText: {
    color: colors.blue,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  modalBody: {
    backgroundColor: colors.white,
    paddingBottom: indent,
    height: (2 * height) / 3,
  },
  modalHeader: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingHorizontal: indent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: halfIndent,
    justifyContent: 'space-between',
  },
  viewButton: {
    height: '100%',
    padding: halfIndent,
  },
  scrollView: {
    paddingBottom: indent,
  },
  tabbarStyle: {
    backgroundColor: 'transparent',
    shadowOpacity: 1,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#5553',
  },
  scrollParent: {
    height: Platform.OS === 'ios' ? '69%' : '73%',
  },
  feecards: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
    marginTop: 10,
  },
  feecarditem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2 - 30,
    padding: 15,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: 'dcdcdc',
    // backgroundColor: '#f7f7f7',
    gap: 5,
  },
  shorttitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.placeholder,
  },
  bigtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black,
  },
  printButton: {
    // width: '100%',
    // paddingHorizontal: indent * 8,
  },
  printButtonStudent: {
    width: '100%',
    marginTop: 10,
  },
  cardsection: {
    marginHorizontal: 10,
  },
  cardheading: {
    fontSize: fontSizes.small,
    marginVertical: 15,
    fontWeight: fontWeights.bold,
    color: colors.placeholder,
  },
  cardMain: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',

    padding: 20,
    marginBottom: 7,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  infoText: {
    fontSize: 12,
    textAlign: 'left',
  },
  receiptCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 5,
    paddingVertical: halfIndent,
    justifyContent: 'space-between',
  },

  leftitems: {
    // borderRightWidth: 1,
    // borderColor: '#d9d8d8',
    // width: '45%',
    flex: 1,
    gap: 10,
  },
  rightitems: {
    // width: '45%',
    flex: 3,
    gap: 10,
    marginLeft: 15,
  },
  nameheading: {
    fontSize: fontSizes.verySmall,
    color: colors.placeholder,
    fontWeight: '800',
  },
  leftCard: {
    width: '33%',
  },
  name: {
    fontSize: fontSizes.small,
    color: colors.white,
    // fontWeight: 'bold',
  },
  btncontain: {
    marginTop: (indent * 1) / 2,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  btnChangepassword: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: 'white',
    backgroundColor: colors.blue,
  },

  btnChangepasswordtext: {
    color: 'white',

    fontSize: fontSizes.verySmall,
    fontWeight: fontWeights.bold,
  },
  due: {
    backgroundColor: '#ff000088',
  },
  paid: {
    backgroundColor: '#00ffaabb',
  },
  scholarship: {
    backgroundColor: '#0055ff88',
  },
  balance: {
    backgroundColor: '#ff55ff99',
  },
  parent: {
    width: '90%',
    marginHorizontal: '5%',
  },
  shadowProp: {
    shadowColor: '#00000033',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#ffffff99',
  },
});
export default styles;
