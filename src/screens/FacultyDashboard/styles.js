import {StyleSheet} from 'react-native';
import {scale} from '../../styles/scalingUtils';
import {doubleIndent, halfIndent, indent, width} from '../../styles/dimensions';
import {colors, fontSizes} from '../../styles';

// f (Platform.OS === 'android') {
//   ReactNativeBlobUtil.android.actionViewIntent(filePath, 'application/pdf')
// } else {
//   ReactNativeBlobUtil.ios.previewDocument(filePath)
// }
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockInText: {
    color: colors.white,
    padding: 5,
    fontWeight: '600',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: halfIndent,
  },
  closeButton: {
    marginLeft: halfIndent,
    backgroundColor: colors.black4,
  },
  clockInbutton: {
    backgroundColor: colors.blue,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: halfIndent / 2,
    alignItems: 'center',
    paddingVertical: halfIndent / 2,
  },
  modalHeader: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: indent,
  },
  modalBody: {
    backgroundColor: colors.white,
    paddingVertical: indent,
    width: '90%',
    alignItems: 'center',
  },
  modalRoot: {
    backgroundColor: '#00000040',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    // justifyContent: 'space-between',
  },
  name: {
    color: colors.black,
    textAlign: 'center',
    fontSize: fontSizes.big,
    fontWeight: 'bold',
    marginBottom: indent,
  },
  studentNameCard: {
    // borderBottomWidth: 1,
    borderColor: colors.placeholder,
    // borderWidth: 2,
    // width: '85%',
    paddingHorizontal: indent,
    paddingVertical: indent / 3,
    // backgroundColor: 'red',
    alignSelf: 'center',
    // backgroundColor: colors.white,
    // backgroundColor: 'red',
  },
  inTime: {
    color: colors.black,
  },
  studetTextView: {
    flexShrink: 1,
    width: '70%',
  },
  profileText: {
    color: colors.black,
    textAlign: 'center',
    // flexWrap: 'wrap',
    flexShrink: 1,
  },
  Location: {
    color: colors.black,
    width: '80%',
    textAlign: 'center',
    fontSize: fontSizes.verySmall,
  },
  instDetails: {
    marginTop: doubleIndent,
    // alignItems: 'flex-end',
    // height: '100%',
    alignItems: 'center',
    marginBottom: indent / 2,
  },
  maleProfile: {
    marginTop: indent,

    height: indent * 10,
    width: '35%',
    borderWidth: 0,
    alignSelf: 'center',
    // borderRadius: 50,
  },
  uniLogo: {
    alignSelf: 'center',
    width: '50%',
    height: indent * 4,
    resizeMode: 'contain',
    marginVertical: 15,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
    marginTop: indent,
    width: '90%',
    marginHorizontal: '5%',
    // backgroundColor: 'red',
    // gap: 5
  },
  cardtext: {
    textAlign: 'center',
    color: 'textcolor',
    fontSize: scale(9),
    fontWeight: 'bold',
  },
  shadowProp: {
    shadowColor: '#00000099',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  width60: {
    width: width / 3,
    fontWeight: '500',
  },

  dashboardIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: indent * 2,
  },
  icon: {
    backgroundColor: colors.blue,
    width: indent * 4,
    height: indent * 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: indent * 2,
  },
  iconText: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: indent / 2,
  },
  attendanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginHorizontal: indent,
    padding: indent,
    alignItems: 'center',
  },
  attendanceRecord: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginBottom: halfIndent,
  },
  clockIn: {
    backgroundColor: '#218352cc',
    paddingVertical: indent / 2,
    paddingHorizontal: indent * 1.5,
    borderRadius: 2,
    flexDirection: 'row',
    gap: 10,
  },
  clockOut: {
    backgroundColor: '#ff0000cc',
    paddingVertical: indent / 2,
    paddingHorizontal: indent * 1.5,
    borderRadius: 2,
    flexDirection: 'row',
    gap: 10,
  },
  clockText: {
    // textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.verySmall,
  },
});

export default styles;
