<script setup lang="ts">
import Login from '../components/Login.vue'
</script>

<template>
  <div class="login">
    <Login />
  </div>
</template>
  
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.column {
  background-color: #ffffff;
  /* Primary color */
  color: rgb(0, 0, 0);
}

.is-secondary {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}
</style>
  