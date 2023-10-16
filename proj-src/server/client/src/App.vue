<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/Nav.vue';
import Footer from './components/Footer.vue';

import { getSession } from './model/session';

const session = getSession();

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
    background-color: azure;
  }

  .container {
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 5px;
    min-height: 100vh;
  }
</style>