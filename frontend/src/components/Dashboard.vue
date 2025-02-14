<template>
  <div class="container">
    <AddVehicle @vehicleAdded="addVehicle" />
    <div class="label"> <h2>Lista de Vehículos</h2> </div>
    <Search @searchQueryChanged="updateSearchQuery" @yearChanged="updateYearFilter" @statusChanged="updateStatusFilter"/>
    <VehicleList :vehicles="vehicles" :searchQuery="searchQuery" :selectedYear="selectedYear" :selectedStatus="selectedStatus"/>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @pageChanged="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useToast } from 'vue-toastification';
  import AddVehicle from './AddVehicle.vue';
  import Search from './Search.vue';
  import VehicleList from './VehicleList.vue';
  import Pagination from './Pagination.vue';
  import { getVehicles } from '../services/vehicleService';

  const vehicles = ref([]);
  const searchQuery = ref('');
  const selectedYear = ref('');
  const selectedStatus = ref('');
  const currentPage = ref(1);
  const totalPages = ref(1);
  const toast = useToast();

  const addVehicle = (newVehicle) => {
    fetchVehicles();
    // vehicles.value.push(newVehicle);
  };

  const updateSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const updateYearFilter = (year) => {
    selectedYear.value = year;
  };

  const updateStatusFilter = (status) => {
    selectedStatus.value = status;
  };

  const fetchVehicles = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }
      const response = await getVehicles(token, page, 10); // Cambia los valores de page y size según sea necesario
      vehicles.value = response.vehicles;
      totalPages.value = Math.ceil(response.total / response.size);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    currentPage.value = page;
    fetchVehicles(page);
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

  .label { 
    border-top: 1px solid #ccc;
    padding-top: 20px;
  }
</style>