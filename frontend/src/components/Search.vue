<template>
  <div class="search">
    <input v-model="searchQuery" @input="search" placeholder="Buscar vehículos por identificador, marca y modelo" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const searchQuery = ref('');
const emits = defineEmits(['searchQueryChanged']);

const search = () => {
  emits('searchQueryChanged', searchQuery.value.toLowerCase());
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: left;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input::placeholder {
  color: #888;
}
</style>