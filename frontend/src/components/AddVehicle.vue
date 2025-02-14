<template>
  <div class="add-vehicle">
    <h2>Agregar Nuevo Vehículo</h2>
    <form @submit.prevent="addVehicle">
      <!-- Campos del formulario -->
      <button type="submit">Agregar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue';

  const emits = defineEmits(['vehicleAdded']);

  const addVehicle = () => {
    // Lógica para agregar vehículo
    const newVehicle = { /* datos del nuevo vehículo */ };
    emits('vehicleAdded', newVehicle);
  };
</script>