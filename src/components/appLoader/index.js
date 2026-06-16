import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
export const loaderRef = React.createRef();
import styles from './styles';
import {colors} from '../../styles';

export function showLoader() {
  let ref = loaderRef.current;
  if (ref) {
    ref.showLoader();
  }
}

export function hideLoader() {
  let ref = loaderRef.current;
  if (ref) {
    ref.hideLoader();
  }
}

class AppLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loader: false};
  }

  showLoader() {
    this.setState({loader: true});
  }

  hideLoader() {
    this.setState({loader: false});
  }

  render() {
    if (this.state.loader) {
      return (
        <View style={styles.modalBackground}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.white}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

export default AppLoader;
