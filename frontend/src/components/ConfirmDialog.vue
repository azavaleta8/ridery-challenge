<template>
    <div class="confirm-dialog">
      <p>{{ message }}</p>
      <div class="buttons">
        <button @click="confirm">Confirmar</button>
        <button @click="cancel">Cancelar</button>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    message: String
  });
  
  const emits = defineEmits(['confirm', 'cancel']);
  
  const confirm = () => {
    emits('confirm');
  };
  
  const cancel = () => {
    emits('cancel');
  };
</script>
  
<style scoped>
  .confirm-dialog {
    text-align: center;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:first-of-type {
    background-color: #42b983;
    color: white;
  }
  
  button:last-of-type {
    background-color: #ff4d4d;
    color: white;
  }
</style>