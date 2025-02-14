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

export const updateVehicle = async (token: string, id: string, vehicleData: { brand: string, vehicleModel: string, year: number, status: string, user_id: string }) => {
  try {
    const response = await axios.put(`${API_URL}/api/vehicles/${id}`, vehicleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el vehículo');
    } else {
      throw new Error('Error al actualizar el vehículo');
    }
  }
};

export const createVehicle = async (token: string, vehicleData: { brand: string, vehicleModel: string, year: number, status: string, user_id: string }) => {
  try {
    const response = await axios.post(`${API_URL}/api/vehicles`, vehicleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al crear el vehículo');
    } else {
      throw new Error('Error al crear el vehículo');
    }
  }
};