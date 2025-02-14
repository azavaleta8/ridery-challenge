<template>
  <div class="search">
    <input v-model="searchQuery" @input="search" placeholder="Buscar vehículos por marca y modelo" />
    <select v-model="selectedYear" @change="filter">
      <option value="">Filtrar por año</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
    <select v-model="selectedStatus" @change="filter">
      <option value="">Filtrar por estado</option>
      <option value="available">Disponible</option>
      <option value="in_maintenance">En mantenimiento</option>
      <option value="in_service">En servicio</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';

const searchQuery = ref('');
const selectedYear = ref('');
const selectedStatus = ref('');
const years = ref<number[]>([]);
const emits = defineEmits(['searchQueryChanged', 'yearChanged', 'statusChanged']);

const search = () => {
  emits('searchQueryChanged', searchQuery.value.toLowerCase());
};

const filter = () => {
  emits('yearChanged', selectedYear.value.toString());
  emits('statusChanged', selectedStatus.value.toString());
};

onMounted(() => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1960; year--) {
    years.value.push(year);
  }
});
</script>

<style scoped>
.search {
  display: flex;
  justify-content: left;
  align-items: center;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  gap: 10px;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input::placeholder {
  color: #888;
}
</style>