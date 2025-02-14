<template>
  <div class="vehicle-list">
    <h2>Lista de Vehículos</h2>
    <ul>
      <li v-for="vehicle in filteredVehicles" :key="vehicle.id">{{ vehicle.name }}</li>
    </ul>
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