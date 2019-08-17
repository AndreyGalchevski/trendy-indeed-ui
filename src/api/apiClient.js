import axios from 'axios';

let baseURL = 'http://localhost:3000/api';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://trendy-indeed-api.herokuapp.com/api';
}

const apiClient = axios.create({ baseURL });

export default apiClient;
