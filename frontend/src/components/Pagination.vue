<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
</template>
  
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    currentPage: Number,
    totalPages: Number
  });
  
  const emits = defineEmits(['pageChanged']);
  
  const prevPage = () => {
    if (props.currentPage > 1) {
      emits('pageChanged', props.currentPage - 1);
    }
  };
  
  const nextPage = () => {
    if (props.currentPage < props.totalPages) {
      emits('pageChanged', props.currentPage + 1);
    }
  };
</script>
  
<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>