<template>
  <div class="vehicle-list">
    <div class="labels">
      <div class="label">Fecha de Registro</div>
      <div class="label">Identificador</div>
      <div class="label">Marca</div>
      <div class="label">Modelo</div>
      <div class="label">Año</div>
      <div class="label">Estado</div>
    </div>
    <ul v-if="filteredVehicles.length > 0">
      <li v-for="vehicle in filteredVehicles" :key="vehicle._id">
        <div class="item">{{ new Date(vehicle.createdAt).toLocaleDateString() }}</div>
        <div class="item">{{ vehicle._id.slice(-5) }}</div>
        <div class="item">{{ vehicle.brand }}</div>
        <div class="item">{{ vehicle.vehicleModel }}</div>
        <div class="item">{{ vehicle.year }}</div>
        <div class="item">
          <select :value="vehicle.status" @change="confirmStatusChange(vehicle, $event)" :key="componentKey">
            <option value="available">Disponible</option>
            <option value="in_maintenance">En mantenimiento</option>
            <option value="in_service">En servicio</option>
          </select>
        </div>
      </li>
    </ul>
    <p v-else>No hay registros</p>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import ConfirmDialog from './ConfirmDialog.vue';
  import { updateVehicle } from '../services/vehicleService';

  const props = defineProps({
    vehicles: Array,
    searchQuery: String,
    selectedYear: String,
    selectedStatus: String
  });

  const toast = useToast();

  const componentKey = ref(0);
  const forceRerender = () => {
    componentKey.value += 1;
  };

  const filteredVehicles = computed(() => {
    return props.vehicles.filter(vehicle => {
      const matchQuery = vehicle.brand.toLowerCase().includes(props.searchQuery) || vehicle.vehicleModel.toLowerCase().includes(props.searchQuery) || vehicle._id.toLowerCase().includes(props.searchQuery)
      const matchYear = !props.selectedYear || vehicle.year == props.selectedYear;
      const matchStatus = !props.selectedStatus || vehicle.status == props.selectedStatus;
      console.log(vehicle.status, props.selectedStatus);
      return matchQuery && matchYear && matchStatus;
    });
  });


  const confirmStatusChange = (vehicle, event) => {
    const originalStatus = vehicle.status;
    const newStatus = event.target.value;

    toast.info({
      component: ConfirmDialog,
      props: {
        message: `¿Estás seguro de que deseas cambiar el estado del vehículo ${vehicle._id.slice(-5)} a ${newStatus}?`
      },
      listeners: {
        confirm: () => {
          updateStatus(vehicle, newStatus);
          toast.clear();
        },
        cancel: () => {
          vehicle.status = originalStatus;
          forceRerender();
          toast.clear();
        }
      },
      timeout: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      position: 'top-center'
    });
  };

  const updateStatus = async (vehicle, newStatus) => {
    const token = localStorage.getItem('token');

    try {

      await updateVehicle(token, vehicle._id, {
        brand: vehicle.brand,
        vehicleModel: vehicle.vehicleModel,
        year: vehicle.year,
        status: newStatus,
        user_id: vehicle.user_id
      });

      vehicle.status = newStatus;
      console.log(`Estado del vehículo ${vehicle._id} actualizado a ${vehicle.status}`);
      toast.success('Estado del vehículo actualizado exitosamente');
      forceRerender();
    } catch (error) {
      console.error('Error al actualizar el estado del vehículo', error);
      toast.error('Error al actualizar el estado del vehículo');
    };
  }
</script>

<style scoped>
  .vehicle-list {
    background-color: #d4edda;
    padding: 20px;
    padding-top: 10px;
    border-radius: 5px;
    flex: 1;
    overflow-y: auto; /* Agregar scroll vertical */
    max-height: 100%; /* Ajustar la altura máxima según sea necesario */
  }

  .labels, li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 2px solid #ccc;
  }

  .label, .item {
    flex: 1;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    border-bottom: 1px solid #ccc;
  }

  p {
    text-align: center;
    color: #888;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  h2 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>