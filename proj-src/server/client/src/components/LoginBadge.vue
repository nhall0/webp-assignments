<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '../model/session';
import { useRouter } from 'vue-router';

const session = ref(getSession());
const router = useRouter();

const logout = () => {
  session.value.user = null;
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="navbar-end" v-if="session.user">
      <div class="navbar-item">
          <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <span>{{ session.user.firstName }} {{ session.user.lastName }}</span>
                  <span class="icon is-small">
                      <i class="fas fa-user-circle" aria-hidden="true"></i>
                  </span>
                  </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div class="dropdown-content">
                      <RouterLink to="/settings" href="#" class="dropdown-item">
                      Settings
                      </RouterLink>
                      <RouterLink to="/profile" href="#" class="dropdown-item">
                      Your Profile
                      </RouterLink>
                      <RouterLink to="/friends" href="#" class="dropdown-item">
                      Friends
                      </RouterLink>
                      <a href="#" class="dropdown-item" @click.prevent="logout">
                      Sign Out
                      </a>
                      <RouterLink to="/admin" href="#" class="dropdown-item" v-if="session.user.role === 1">
                      Admin Panel
                      </RouterLink>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<style scoped>

</style>
