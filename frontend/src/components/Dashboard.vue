<template>
    <div class="container">
      <AddVehicle />
      <Search />
      <VehicleList />
    </div>
  </template>
  
  <script setup lang="ts">
  import AddVehicle from './AddVehicle.vue';
  import Search from './Search.vue';
  import VehicleList from './VehicleList.vue';
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