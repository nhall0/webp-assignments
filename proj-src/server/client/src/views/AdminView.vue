<script setup lang="ts">
import { reactive } from 'vue';
import { getUsers } from '@/model/users';

const state = reactive({
  users: getUsers()
});

const userCount = state.users ? Object.keys(state.users).length : 0;

</script>

<style scoped>
.admin-page {
  padding: 20px;
}
</style>


<template>
  <div class="admin-page">
    <section class="section">
      <div class="container">
        <h1 class="title">Admin Page</h1>
        
        <!-- User Management -->
        <div class="box">
          <h2 class="subtitle">User Management</h2>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in state.users" :key="user.username">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Statistics -->
        <div class="box">
          <h2 class="subtitle">Statistics</h2>
          <ul>
            <li>Total Users: {{ userCount }}</li>
            <!-- Add more statistics as needed -->
          </ul>
        </div>

      </div>
    </section>
  </div>
</template>

