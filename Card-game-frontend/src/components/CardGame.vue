<template>
    <div>
      <button @click="getGameStatus">Проверить статус игры</button>
      <p>{{ statusMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        statusMessage: ''
      };
    },
    methods: {
      async getGameStatus() {
        const res = await axios.get('https://localhost:5001/api/game/status');
        this.statusMessage = res.data.message;
      }
    }
  };
  </script>
  