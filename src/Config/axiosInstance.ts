import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const handleTokenRefresh = async (originalRequest: any) => {
    try {
        const response = await axiosInstance.post('auth/refresh');
        if (response.status === 202) {
            return axiosInstance(originalRequest);
        } else {
            redirectToLogin();
        }
    } catch (error) {
        redirectToLogin();
    }
};

const redirectToLogin = () => {
    window.location.pathname = '/login';
};

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (originalRequest.url === 'auth/refresh') {
                redirectToLogin();
                return Promise.reject(error);
            }

            return handleTokenRefresh(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;