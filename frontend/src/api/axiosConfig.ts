import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; 

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
            originalRequest._retry = true; // Oznacz żądanie jako ponawiane

            // Jeśli odświeżanie tokena nie jest już w toku
            if (!isRefreshing) {
                isRefreshing = true; // Ustaw flagę, że odświeżanie się rozpoczęło
                const authStore = useAuthStore(); // Pobierz instancję store

                try {
                    await authStore.refresh();
                    const newAccessToken = authStore.accessToken; // Pobierz nowy access token

                    processQueue(null, newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; 
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Jeśli odświeżanie się nie powiedzie (np. błąd serwera, nieważny refresh token)
                    processQueue(refreshError, null); // Odrzuć wszystkie przetrzymane żądania
                    authStore.logout(); // Wyloguj użytkownika
                    window.location.href = '/login'; // Przekieruj na stronę logowania (opcjonalne)
                    return Promise.reject(refreshError); // Odrzuć oryginalne żądanie
                } finally {
                    isRefreshing = false; // Zakończ proces odświeżania, odblokuj kolejne żądania
                }
            } else {
                // Jeśli odświeżanie jest w toku, przetrzymaj żądanie w kolejce
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    // Gdy odświeżanie się zakończy, ponów żądanie z nowym tokenem
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => {
                    // Jeśli odświeżanie się nie powiedzie, odrzuć żądanie
                    return Promise.reject(err);
                });
            }
        }

        // Jeśli błąd nie jest związany z autoryzacją, po prostu go odrzuć
        return Promise.reject(error);
    }
);

export default apiClient;
