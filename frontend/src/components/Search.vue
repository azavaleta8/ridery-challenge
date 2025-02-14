<template>
  <div class="search">
    <h2>Buscador</h2>
    <input v-model="searchQuery" @input="search" placeholder="Buscar vehículos" />
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';

  const searchQuery = ref('');
  const emits = defineEmits(['searchQueryChanged']);

  const search = () => {
    emits('searchQueryChanged', searchQuery.value);
  };
</script>