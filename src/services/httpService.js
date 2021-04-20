import axios from "axios";
import { toast } from 'react-toastify';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    if (error.response && error.response.status >= 400 && error.response.status < 500)
        return Promise.reject(error);

    console.log('Unexpected error happened');
    toast.error('Unexpected error');
})

function log() {
    console.log("re called")
}

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    log
}