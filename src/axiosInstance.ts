import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    function (response) {
        console.log('Response:', response);
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            window.location.pathname = '/401';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;