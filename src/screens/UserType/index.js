import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {Platform, UIManager} from 'react-native';

import LoginView from './instituteCodeView';

const InstituteCodeContainer = props => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const onPress = event => {
    if (event === 2) {
      props.navigation.navigate('studentLogin');
    } else {
      props.navigation.navigate('facultyLogin', props.route.params);
    }
  };

  return <LoginView onPress={onPress} navigation={props.navigation} />;
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
});

export default connect(mapStateToProps)(InstituteCodeContainer);
