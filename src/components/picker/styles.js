import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  itemsWrapper: {
    backgroundColor: colors.lightGrey,
    height: '25%',
    width: '70%',
  },
  closeButton: {
    height: 25,
    width: 25,
    borderRadius: 12,
    backgroundColor: colors.lightGrey,
    alignSelf: 'flex-start',
    marginLeft: '15%',
  },
  closeButtonText: {
    color: colors.black,
    textAlign: 'center',
    marginTop: 4,
  },
  pickerItem: {
    backgroundColor: 'white',
    height: 45,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
  },
  pickerText: {
    color: colors.lightBlue,
    fontWeight: 'bold',
  },
});
