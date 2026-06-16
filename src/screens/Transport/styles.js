import {StyleSheet,Dimensions} from 'react-native';
import {indent} from '../../styles/dimensions';
import {colors, fontSizes} from '../../styles';

const styles = StyleSheet.create({
   scroll: {
    paddingBottom: indent,
  },
  infocardHeading: {
    fontSize: fontSizes.medium,
    margin: indent,
    color: '#000',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: indent/4,
    marginBottom: indent,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: indent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    
  },
  box1: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: indent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  transportDetails: {
    marginHorizontal: indent/2,
    backgroundColor: '#fff',
    padding: indent/1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailRow: {
    marginVertical: 5,
  },
  infoheading: {
    fontSize: fontSizes.small,
    color: colors.placeholder,
    fontWeight: 'bold',
  },
  infoinput: {
    fontSize: fontSizes.small,
    color: 'black',
    fontWeight: '500',
  },
rowContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: indent/3,
    alignItems: 'flex-start', 
  },
  infoheading1: {
    flex: 1,
    fontSize: fontSizes.verySmall,
    color: '#8f8b8b',
    fontWeight: '900',
    textAlign: 'left',
  },
  infoinput1: {
    flex: 1,
    fontSize: fontSizes.verySmall,
    color: '#000',
    fontWeight: '600',
    textAlign: 'left', 
  },
  
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeText: { fontSize: 16, color: 'red', fontWeight: 'bold' },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: '80%', 
    height: '80%', 
    maxWidth: 300, 
    maxHeight: 300, 
  },
  Detailnotfound:{
    color:'black',
    fontWeight:'300',
    fontSize: fontSizes.medium,
  }
});

export default styles;
