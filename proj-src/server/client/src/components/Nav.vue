<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoginBadge from './LoginBadge.vue';
import {getSession} from '../model/session'

const isActive = ref(false);
const session = getSession();

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" v-if="session.user">
    <div class="navbar-brand">
      <a class="navbar-item">
        FH
      </a>

      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/" >Home</RouterLink>
        <RouterLink class="navbar-item" to="/workouts">Workouts</RouterLink>
        <RouterLink class="navbar-item" to="/goals">Goals</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <LoginBadge />
        </div>
      </div>
    </div>
  </nav>
</template>


<style scoped>

.router-link-active {

  font-weight: bold;
  border-bottom: 2px solid #00d1b2;
}
</style>