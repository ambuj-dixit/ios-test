import {View, Image, Pressable, Text, LayoutAnimation} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import styles from './styles';
import {drawerIcon, bell} from '../../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../styles';
import {indent} from '../../styles/dimensions';
import {globalConstants} from '../../constants';

const CustomHeader = ({
  navigation,
  screenName,
  title,
  instituteDetails,
  userType,
  setisLocationModalVisible,
  unreadCount,
}) => {
  const onDrawerPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.parent}>
      <Pressable style={styles.drawerImageContainer} onPress={onDrawerPress}>
        <Image
          source={drawerIcon}
          resizeMode="contain"
          style={styles.drawerImage}
        />
      </Pressable>
      <View style={styles.flexHead}>
        {instituteDetails?.InstLogo ? (
          <Image
            source={{
              uri: 'data:image/png;base64,' + instituteDetails?.InstLogo,
            }}
            resizeMode="stretch"
            style={styles.uniLogo}
          />
        ) : (
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.uniLogo}
          />
        )}
      </View>
      <View style={styles.headerRight}>
        {userType === 'faculty' && screenName === 'dashboard' && (
          <MaterialIcons
            name="thumb-up"
            color={colors.blue}
            size={indent * 2}
            style={styles.attedanceIcon}
            onPress={() => setisLocationModalVisible(true)}
          />
        )}
        <Pressable onPress={() => navigation.navigate(globalConstants.default.routeNames.NOTIFICATIONS)}>
          <Image source={bell} resizeMode="contain" style={styles.bellIcon} />
          {unreadCount > 0 && (
            <View style={styles.badgeView}>
              <Text style={styles.noOfNotifications}>{unreadCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  unreadCount: state.dashboard.unreadCount,
});

export default connect(mapStateToProps)(CustomHeader);

