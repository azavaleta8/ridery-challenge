<template>
    <div class="container">
      <AddVehicle @vehicleAdded="addVehicle" />
      <Search @searchQueryChanged="updateSearchQuery" />
      <VehicleList :vehicles="vehicles" :searchQuery="searchQuery" />
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import AddVehicle from './AddVehicle.vue';
  import Search from './Search.vue';
  import VehicleList from './VehicleList.vue';
  
  const vehicles = ref([]);
  const searchQuery = ref('');
  
  const addVehicle = (newVehicle) => {
    vehicles.value.push(newVehicle);
  };
  
  const updateSearchQuery = (query) => {
    searchQuery.value = query;
  };
</script>
  
<style scoped>
  .container {
    margin: auto;
    height: 90%;
    width: 60%;
    background-color: white;
    color: black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
</style>