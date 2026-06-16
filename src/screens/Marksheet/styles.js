import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes, fontWeights} from '../../styles';
import {halfIndent, indent} from '../../styles/dimensions';
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
  heading: {
    fontSize: fontSizes.big,
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  cardsection: {
    marginHorizontal: 20,
    // marginVertical: 20,
  },
  cardheading: {
    fontSize: fontSizes.small,
    marginVertical: 15,
    fontWeight: fontWeights.bold,
    color: colors.black,
    marginTop: indent * 2,
  },
  card: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftitems: {
    borderRightWidth: 1,
    borderColor: '#d9d8d8',
    width: '50%',
    gap: 10,
    height: '100%',
  },
  rightitems: {
    width: '50%',
    height: '100%',
    gap: 10,
    // backgroundColor: 'red',
    // marginLeft: 15,
  },
  rightText: {
    textAlign: 'right',
  },
  nameheading: {
    fontSize: fontSizes.verySmall,
    color: colors.placeholder,
  },
  name: {
    fontSize: fontSizes.verySmall,
    fontWeight: 'bold',
    color: colors.black,
    textTransform: 'capitalize',
  },
  itemss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseName: {
    flexWrap: 'wrap',
    width: '60%',
    textAlign: 'right',
  },

  mrkcard: {
    backgroundColor: '#f7f7f7',
    gap: 10,
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  mrkleftitems: {
    borderRightWidth: 1,
    borderColor: '#d9d8d8',
    width: '50%',
    gap: 10,
  },
  mrkrightitems: {
    gap: 10,
    marginLeft: 15,
  },
  mrkcardbottomitem: {
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  custom: {
    marginBottom: 10,
    paddingHorizontal: 25,
    fontSize: fontSizes.verySmall,
  },
});
export default styles;
