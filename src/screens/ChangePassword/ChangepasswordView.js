import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {backgroundImage} from '../../assets/images';
import {colors, fontSizes, fontWeights} from '../../styles';
import {HeaderWithTitle} from '../../components';

const ChangepasswordView = ({
  confirmnewPassword,
  setnewPassword,
  setcurrentPassword,
  currentPassword,
  handlePasswordChange,
  setconfirmnewPassword,
  newPassword,
  resetPassword,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Change password" navigation={navigation} />

        <Text style={styles.heading}>Change Password</Text>

        <View style={styles.inputcontainer}>
          <View style={styles.inputitems}>
            {/* <Text style={styles.labels}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              placeholderTextColor={colors.placeholder}
              placeholder="UserName"
              autoCapitalize="none"
            /> */}
            <Text style={styles.labels}>Enter Current Password</Text>

            <TextInput
              value={currentPassword}
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              onChangeText={setcurrentPassword}
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
            />

            <Text style={styles.labels}>Enter New Password</Text>

            <TextInput
              value={newPassword}
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              onChangeText={setnewPassword}
            />
            <Text style={styles.labels}>Confirm New Password</Text>

            <TextInput
              value={confirmnewPassword}
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              onChangeText={setconfirmnewPassword}
            />
          </View>
          <View style={styles.btncontain}>
            <TouchableOpacity
              style={styles.btnChangepassword}
              onPress={handlePasswordChange}>
              <Text style={styles.btnChangepasswordtext}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnReset} onPress={resetPassword}>
              <Text style={styles.btnChangepasswordtext}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChangepasswordView;
