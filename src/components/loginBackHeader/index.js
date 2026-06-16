import {View, Image, Pressable, Text, LayoutAnimation} from 'react-native';
import React from 'react';
import styles from './styles';
import {drawerIcon, backIcon} from '../../assets/images';

const LoginBackHeader = ({navigation}) => {
  const onDrawerPress = () => {
    navigation && navigation.goBack();
  };

  return (
    <View style={styles.parent}>
      <Pressable style={styles.drawerImageContainer} onPress={onDrawerPress}>
        <Image
          source={backIcon}
          resizeMode="contain"
          style={styles.drawerImage}
        />
      </Pressable>
    </View>
  );
};

export default LoginBackHeader;
