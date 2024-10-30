import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const handleTokenRefresh = async (originalRequest: InternalAxiosRequestConfig): Promise<AxiosResponse | void> => {
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
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest.url !== 'auth/refresh' && !originalRequest._retry) {
            originalRequest._retry = true;
            return handleTokenRefresh(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;