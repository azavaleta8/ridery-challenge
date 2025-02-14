<template>
  <div class="vehicle-list">
    <h2>Lista de Vehículos</h2>
    <ul v-if="filteredVehicles.length > 0">
      <li v-for="vehicle in filteredVehicles" :key="vehicle.id">{{ vehicle.name }}</li>
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
    return props.vehicles.filter(vehicle => vehicle.name.includes(props.searchQuery));
  });
</script>

<style scoped>
  .vehicle-list {
    background-color: #d4edda;
    padding: 20px;
    border-radius: 5px;
    flex: 1;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  p {
    text-align: center;
    color: #888;
  }
</style>