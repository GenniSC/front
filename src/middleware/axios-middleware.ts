import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});



axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    const language = localStorage.getItem('language') || 'pt-BR';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const { data } = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Erro ao tentar atualizar o token:', refreshError);
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;