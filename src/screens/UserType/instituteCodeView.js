import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {colors} from '../../styles';
import {LoginBackHeader} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {backgroundImage} from '../../assets/images';
import {indent} from '../../styles/dimensions';

const InstituteCodeView = ({onPress, navigation}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={backgroundImage}
      style={styles.background}>
      <LoginBackHeader navigation={navigation} />
      <View style={styles.loginhead}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.heading}>ESIM Campus Solution</Text>
        <Text style={styles.subheading}>
          Transforming Education with ESIM Campus Solution
        </Text>
      </View>

      <View style={styles.inputcontainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {marginTop: indent}]}
            onPress={() => onPress(1)}>
            <Entypo name="home" size={indent * 4} color={colors.blue} />
            <Text style={styles.title}>Faculty Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPress(2)}>
            <Feather name="user" size={indent * 4} color={colors.blue} />
            <Text style={styles.title}>Student Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.loginfooter}>
        <Text style={styles.loginfootertext}>
          A Product Of MKT Softwares Pvt. Ltd.
        </Text>
      </View>
    </ImageBackground>
  );
};

export default InstituteCodeView;
