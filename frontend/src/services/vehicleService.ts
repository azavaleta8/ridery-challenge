import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getVehicles = async (token: string, page: number, size: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/vehicles`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,
        size
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al obtener los vehículos');
    } else {
      throw new Error('Error al obtener los vehículos');
    }
  }
};