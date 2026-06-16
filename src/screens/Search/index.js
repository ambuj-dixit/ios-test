import React, {useRef, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {loginOperations} from '../../reduxOperations/login';

import SearchView from './searchView';
import commonFunctions from '../../utils';

function SearchContainer(props) {
  return <SearchView />;
}

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
});

export default connect(mapStateToProps)(SearchContainer);
