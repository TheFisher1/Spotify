import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './authService';
import { jwtUtils } from '../utils/jwtUtils';
import { devConfig } from '../config';

const api: AxiosInstance = axios.create({
    baseURL: devConfig.baseApiUrl,
    timeout: devConfig.timeout,
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
        console.log(error)
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        console.log(error)

        if (error.response?.status === 401) {
            authService.logout();
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

export default api; 