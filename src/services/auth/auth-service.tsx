

import { IUser } from '../../contexts/types';

import axios from 'axios';

// URL base da API
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const axiosHandler = axios.create({
  baseURL: BASE_URL,
});

// Função auxiliar para tratar erros da resposta
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw error.response?.data || error.message;
  } else {
    throw error;
  }
};

// Serviço para autorizar/login mock

interface IAuthResponse {
  token: string;
  user: IUser;
  access_token?: string;
  refresh_token?: string;
  expires?: Date;
}

// Serviço para autorizar/login
export const authorize = async (email: string, password: string): Promise<IAuthResponse | undefined> => {
  try {
    console.log(BASE_URL)
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const response = await axiosHandler.post<IAuthResponse>('/token', formData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Serviço para alterar senha
export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const payload = {
      user_id: userId,
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    const { data } = await axios.post('/change-password', payload);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Serviço para recuperar senha esquecida (esqueci a senha)
export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axios.get('/forgot-password', {
      params: { email },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Serviço para redefinir a senha
export const resetPassword = async (email: string, code: string, newPassword: string) => {
  try {
    const payload = {
      email,
      code,
      new_password: newPassword,
    };

    const { data } = await axios.post('/reset-password', payload);
    return data;
  } catch (error) {
    handleError(error);
  }
};
