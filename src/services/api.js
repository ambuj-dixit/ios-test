import axios from 'axios';
import {globalConstants} from '../constants';

let URL = globalConstants.default.BASE_URL;

const API = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
