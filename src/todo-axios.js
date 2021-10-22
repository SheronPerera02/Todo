import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://todoo-16959-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export default instance;
