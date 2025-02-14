import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    } else {
      throw new Error('Error al iniciar sesión');
    }
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/users`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al registrarse');
    } else {
      throw new Error('Error al registrarse');
    }
  }
};