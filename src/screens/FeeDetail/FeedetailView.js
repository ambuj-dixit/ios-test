import {View, ImageBackground} from 'react-native';
import React from 'react';
import {backgroundImage} from '../../assets/images';

import styles from './styles';
import {HeaderWithTitle} from '../../components';

import PropTypes from 'prop-types';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import {colors} from '../../styles';
import Receipt from './Receipt';
import Fee from './Fee';
import Transactions from './Transactions';

const TopBarTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.black,
      tabBarInactiveTintColor: colors.blue,
      tabBarIndicatorStyle: {
        backgroundColor: colors.blue,
      },
      tabBarStyle: styles.tabbarStyle,
    }}>
    <Tab.Screen name="Fee" component={Fee} />
    <Tab.Screen name="History" component={Transactions} />
    <Tab.Screen name="Receipts" component={Receipt} />
  </Tab.Navigator>
);

const FeedetailView = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Fee Detail" navigation={navigation} />
        <TopBarTabs />
      </ImageBackground>
    </View>
  );
};

export default FeedetailView;

FeedetailView.propTypes = {
  navigation: PropTypes.any,
};
