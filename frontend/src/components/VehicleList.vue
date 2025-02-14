<template>
  <div class="vehicle-list">
    <h2>Lista de Vehículos</h2>
    <div class="labels">
      <div class="label">Identificador</div>
      <div class="label">Marca</div>
      <div class="label">Modelo</div>
      <div class="label">Año</div>
      <div class="label">Estado</div>
    </div>
    <ul v-if="filteredVehicles.length > 0">
      <li v-for="vehicle in filteredVehicles" :key="vehicle._id">
        <div class="item">{{ vehicle._id.slice(-5) }}</div>
        <div class="item">{{ vehicle.brand }}</div>
        <div class="item">{{ vehicle.vehicleModel }}</div>
        <div class="item">{{ vehicle.year }}</div>
        <div class="item">{{ vehicle.status }}</div>
      </li>
    </ul>
    <p v-else>No hay registros</p>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  const props = defineProps({
    vehicles: Array,
    searchQuery: String
  });

  const filteredVehicles = computed(() => {
    return props.vehicles.filter(vehicle => 
      vehicle.brand.includes(props.searchQuery) || 
      vehicle.vehicleModel.includes(props.searchQuery) ||
      vehicle.year.toString().includes(props.searchQuery) ||
      vehicle.status.includes(props.searchQuery)
    );
  });
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
</style>