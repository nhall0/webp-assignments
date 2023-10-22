<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/Nav.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <header>
    <NavBar/>
  </header>

  <div class="container">
    <RouterView />
  </div>

  <Footer/>

</template>

<style scoped>
  body {
    background-color: rgb(229, 255, 249);
  }

  .container {
    background-color: rgb(255, 255, 255);
    padding: 5px;
    min-height: 100vh;
    max-width: 100%;
  }
</style>