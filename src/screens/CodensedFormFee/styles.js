import {Dimensions, StyleSheet} from 'react-native';
import {doubleIndent, halfIndent, indent, width} from '../../styles/dimensions';
import {colors, fontSizes} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mainview: {
    padding: indent,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: halfIndent,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  receiptNo: {
    backgroundColor: 'green',
    marginTop: indent,
  },
  cell: {
    flex: 1,
  },
  printButton: {
    marginTop: 0,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: halfIndent,
    padding: indent,
    marginBottom: indent,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: halfIndent,
    elevation: 5,
    alignSelf: 'center',
    minWidth: width * 0.8,
    maxWidth: width * 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: halfIndent,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: colors.black,
  },
  cardValue: {
    color: colors.black,
    // textAlign: 'right',
  },
  subjectCode: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: colors.black,
    width: '80%',
  },
  inputLabel: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: fontSizes.small,
  },
  sectionLabel: {
    color: colors.blue,
    fontSize: fontSizes.medium,
    marginBottom: indent,
  },
  input: {
    borderWidth: 1,
    color: colors.black,
    borderRadius: halfIndent / 2,
    borderColor: colors.placeholder,
    padding: halfIndent,
    marginBottom: halfIndent,
    marginTop: halfIndent / 2,
    backgroundColor: colors.white,
  },
  inputContainer: {
    padding: indent,
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    marginBottom: indent,
  },
});

export default styles;
