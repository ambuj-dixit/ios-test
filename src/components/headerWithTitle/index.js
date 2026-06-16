import {View, Image, Pressable, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import {bell, backIcon} from '../../assets/images';
import {globalConstants} from '../../constants';

const CustomHeader = ({navigation, screenName, title, unreadCount}) => {
  const onBackButtonPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.parent}>
      <Pressable
        style={styles.drawerImageContainer}
        onPress={onBackButtonPress}>
        <Image
          source={backIcon}
          resizeMode="contain"
          style={styles.drawerImage}
        />
      </Pressable>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable
        style={styles.titleView}
        onPress={() => navigation.navigate(globalConstants.default.routeNames.NOTIFICATIONS)}
      >
        <Image source={bell} resizeMode="contain" style={styles.bellIcon} />
        {unreadCount > 0 && (
          <View style={styles.badgeView}>
            <Text style={styles.noOfNotifications}>{unreadCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const mapStateToProps = state => ({
  unreadCount: state.dashboard.unreadCount,
});

export default connect(mapStateToProps)(CustomHeader);
