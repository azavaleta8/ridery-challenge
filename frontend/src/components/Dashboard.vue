<template>
  <div class="container">
    <AddVehicle @vehicleAdded="addVehicle" />
    <Search @searchQueryChanged="updateSearchQuery" />
    <VehicleList :vehicles="vehicles" :searchQuery="searchQuery" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import AddVehicle from './AddVehicle.vue';
  import Search from './Search.vue';
  import VehicleList from './VehicleList.vue';
  import { getVehicles } from '../services/vehicleService';

  const vehicles = ref([]);
  const searchQuery = ref('');
  const toast = useToast();

  const addVehicle = (newVehicle) => {
    vehicles.value.push(newVehicle);
  };

  const updateSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await getVehicles(token, 1, 10);
      vehicles.value = response.vehicles;
      console.log(vehicles.value)
    } catch (error) {
      toast.error(error.message);
    }
  };

  onMounted(() => {
    fetchVehicles();
  });
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