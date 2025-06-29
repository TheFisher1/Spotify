import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './authService';
import { jwtUtils } from '../utils/jwtUtils';

const BaseURL = import.meta.env.VITE_API_URL

const api: AxiosInstance = axios.create({
    baseURL: BaseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token && jwtUtils.validateToken(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            authService.logout();
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            authService.logout();
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

export default api; 