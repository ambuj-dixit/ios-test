import {StyleSheet} from 'react-native';
import {indent} from '../../styles/dimensions';
import {colors, fontSizes} from '../../styles';

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: indent,
  },
  infocardHeading: {
    fontSize: fontSizes.medium,
    margin: indent,
    color: 'black',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: indent/2,
    marginBottom: indent/2,
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
borderRadius:10,
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
    marginHorizontal: indent/1.1,
    backgroundColor: '#fff',
    padding: indent/1.2,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical:indent/.8,
    paddingVertical:indent/.8,
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
    fontSize: fontSizes.verySmall,
    color: 'black',
    fontWeight: '500',
    marginTop:5,
  },

  rowContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: indent/2,
    alignItems: 'center', 
  },
  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: indent/.8,
    alignItems: 'center' ,
  },
  infoheading1: {
    flex: 1,
    fontSize: fontSizes.verySmall,
    color: colors.placeholder,
    fontWeight: 'bold',
    textAlign: 'justify', 
  },
  infoinput1: {
    flex: 1,
    fontSize: fontSizes.verySmall,
    color: 'black',
    fontWeight: '500',
    textAlign:'left', 
  },
  subtitle:{
    color:'black',
    fontWeight:'900',
    marginBottom:8,
  },
  verticalline: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
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

