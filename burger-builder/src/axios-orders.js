import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-f5c8d.firebaseio.com/'
});

export default instance;