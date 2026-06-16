import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button as NativeButton,
  Alert,
  TextInput,
} from 'react-native';
import styles from './styles';

import {colors} from '../../styles';
import {Button, LoginBackHeader} from '../../components';
import {backgroundImage} from '../../assets/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({
  username,
  password,
  setUsername,
  onLogin,
  setPassword,
  instituteDetails,
  onForgotPasswordButtonclick,
  navigation,
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={backgroundImage}
      style={styles.background}>
      <LoginBackHeader navigation={navigation} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.rootContainer}
        showsVerticalScrollIndicator={false}>
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
          <Text style={styles.formheading}>{instituteDetails?.ClientName}</Text>
          <Text style={styles.formSubheading}>Sign In To Student Portal</Text>
          <View style={styles.inputitems}>
            <Text style={styles.labels}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={colors.placeholder}
              placeholder="UserName"
              autoCapitalize="none"
            />
            <Text style={styles.labels}>Password</Text>

            <TextInput
              value={password}
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              onEndEditing={onLogin}
            />

            <Button title="Login" onPress={onLogin} />

            <TouchableOpacity onPress={onForgotPasswordButtonclick}>
              <Text style={styles.forgotlabel}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.loginfooter}>
          <Text style={styles.loginfootertext}>
            A Product Of MKT Softwares Pvt. Ltd.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;
