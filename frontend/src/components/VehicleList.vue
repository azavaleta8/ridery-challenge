<template>
  <div class="vehicle-list">
    <h2>Lista de Vehículos</h2>
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
  import { computed, defineProps, reactive, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import ConfirmDialog from './ConfirmDialog.vue';

  const props = defineProps({
    vehicles: Array,
    searchQuery: String
  });

  const toast = useToast();

  const componentKey = ref(0);
  const forceRerender = () => {
    componentKey.value += 1;
  };

  const filteredVehicles = computed(() => {
    return props.vehicles.filter(vehicle => 
      vehicle.brand.toLowerCase().includes(props.searchQuery) || 
      vehicle.vehicleModel.toLowerCase().includes(props.searchQuery)
    );
  });

  const confirmStatusChange = (vehicle, event) => {
    console.log(vehicle, event.target.value);
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

  const updateStatus = (vehicle, newStatus) => {
    vehicle.status = newStatus;
    // Aquí puedes agregar la lógica para actualizar el estado del vehículo en el backend
    console.log(`Estado del vehículo ${vehicle._id} actualizado a ${vehicle.status}`);
  };
</script>

<style scoped>
  .vehicle-list {
    background-color: #d4edda;
    padding: 20px;
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
</style>