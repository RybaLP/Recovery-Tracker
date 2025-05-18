import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; 
import { error } from 'console';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', 
    withCredentials: true, 
});

let isRefreshing = false; 
let failedQueue: { resolve: (value: any) => void; reject: (error: any) => void }[] = []; 

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            
            if (!isRefreshing) {
                isRefreshing = true; 
                const authStore = useAuthStore(); 

                try {
                    await authStore.refresh();
                    const newAccessToken = authStore.accessToken; 

                    processQueue(null, newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; 
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    
                    processQueue(refreshError, null); 
                    authStore.logout(); 
                    window.location.href = '/login'; 
                    return Promise.reject(refreshError); 
                } finally {
                    isRefreshing = false; 
                }
            } else {
                
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => {
                    
                    return Promise.reject(err);
                });
            }
        }

        
        return Promise.reject(error);
    }
);

export default apiClient;
