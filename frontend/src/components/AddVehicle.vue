<template>
  <div class="add-vehicle">
    <h2>Agregar Nuevo Vehículo</h2>
    <form @submit.prevent="addVehicle">
      <div class="form-group">
        <input v-model="brand" type="text" placeholder="Marca" required />
      </div>
      <div class="form-group">
        <input v-model="vehicleModel" type="text" placeholder="Modelo" required />
      </div>
      <div class="form-group">
        <select v-model="year" required>
          <option value="" disabled>Seleccione el año</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="form-group">
        <select v-model="status" required>
          <option value="" disabled>Seleccione el estado</option>
          <option value="available">Disponible</option>
          <option value="in_maintenance">En mantenimiento</option>
          <option value="in_service">En servicio</option>
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits, onMounted } from 'vue';
  import { jwtDecode } from 'jwt-decode';
  import { createVehicle } from '../services/vehicleService';
  import { useToast } from 'vue-toastification';

  const emits = defineEmits(['vehicleAdded']);
  const toast = useToast();

  const brand = ref('');
  const vehicleModel = ref('');
  const year = ref('');
  const status = ref('');
  const years = ref<number[]>([]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode<{ id: string }>(token);
    return decodedToken.id;
  };

  const addVehicle = async () => {
    let newVehicle = {
      brand: brand.value,
      vehicleModel: vehicleModel.value,
      year: year.value,
      status: status.value,
      user_id: getUserIdFromToken()
    };

    try {
      const token = localStorage.getItem('token');
      newVehicle = await createVehicle(token, newVehicle);
      toast.success('Vehículo agregado exitosamente');
      emits('vehicleAdded', newVehicle);

      // Limpiar el formulario después de agregar el vehículo
      brand.value = '';
      vehicleModel.value = '';
      year.value = '';
      status.value = '';
    } catch (error) {
      toast.error(error.message || 'Error al agregar el vehículo');
    }
  };

  onMounted(() => {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2000; y--) {
      years.value.push(y);
    }
  });
</script>

<style scoped>
  form {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;
  }

  input, select {
    max-width: 200px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  h2 {
    margin-bottom: 20px;
  }
</style>