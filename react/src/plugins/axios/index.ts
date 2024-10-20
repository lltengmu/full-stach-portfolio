import Axios from './Axios';

export const Http = new Axios({
  baseURL: 'http://localhost:3010/api',
  timeout: 3000,
});
