import {TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../styles';
import {indent} from '../../styles/dimensions';
import {verifiedUser} from '../../assets/images';

const Card = ({item, onCardPress}) => {
  if (!item?.routeNames) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onCardPress}
      style={[styles.card]}>
      <View style={styles.innerCard}>
        <View style={styles.iconBg}>
          {item.ClassName !== 'verifiedUser' ? (
            <Icon
              name={item?.ClassName ?? 'file-o'}
              size={(indent * 3) / 2}
              color={colors.white}
            />
          ) : (
            <Image
              source={verifiedUser}
              tintColor={colors.white}
              style={styles.userImage}
            />
          )}
        </View>
        <Text style={styles.title}>{item?.Title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
