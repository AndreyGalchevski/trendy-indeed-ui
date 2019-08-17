import axios from 'axios';

let baseURL = 'https://trendy-indeed-api.herokuapp.com/api';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://178.62.6.214:3000/api';
}

const Api = axios.create({ baseURL });

export default Api;
