import {StyleSheet} from 'react-native';
import {doubleIndent, indent} from '../../styles/dimensions';
import {colors, fontSizes} from '../../styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  profilecard: {
    margin: 22,
    backgroundColor: '#33354e',
    padding: 20,
    flexDirection: 'row',
    gap: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: doubleIndent,
  },
  profileimage: {
    width: 75,
    height: 75,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  },
  profileusername: {
    color: 'white',
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: '90%',
  },
  profiledetails: {
    fontSize: fontSizes.verySmall,
    color: '#f0ebeb',
    flexWrap: 'wrap',
  },
  profileuserdetail: {
    gap: 5,
    flex: 1, // Added to ensure text wraps within available space
  },

  //   Info section started

  infocardcontainer: {
    margin: 20,

    borderWidth: 1,
    borderColor: '#d9d8d8',
    padding: 20,
    borderRadius: 13,
  },
  infocarditems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingBottom: indent * 0.8,
  },
  devider: {
    borderBottomWidth: 1,
    borderColor: '#d9d8d8',
    marginBottom: indent * 2,
  },

  infocardHeading: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
    color: 'black',
    fontWeight: '500',
  },
  icons: {
    width: 40,
    height: 40,
  },
  infocard: {
    gap: 3,
    flex: 1, // Added to prevent horizontal overflow
  },
  infoheading: {
    fontSize: fontSizes.verySmall,
    color: '#a4a8ad',
    fontWeight: 'bold',
  },
  infoinput: {
    fontSize: fontSizes.small,
    color: 'black',
    fontWeight: '500',
  },
});

export default styles;
