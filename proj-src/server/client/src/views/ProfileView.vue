<template>
  <div class="profile-page">
    <section class="section">
      <div class="container">
        <h1 class="title">Your Profile</h1>
        
        <!-- Profile Information -->
        <div class="box">
          <h2 class="subtitle">Profile Information</h2>
          <div class="content">
            <p><strong>Name:</strong> {{ profile.name }}</p>
            <p><strong>Email:</strong> {{ profile.email }}</p>
            <!-- Add more profile information as needed -->
          </div>
        </div>

        <!-- Change Password Form -->
        <div class="box">
          <h2 class="subtitle">Change Password</h2>
          <form @submit.prevent="changePassword">
            <div class="field">
              <label class="label">Current Password</label>
              <div class="control">
                <input class="input" type="password" v-model="passwords.current" placeholder="Enter your current password">
              </div>
            </div>
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input class="input" type="password" v-model="passwords.new" placeholder="Enter your new password">
              </div>
            </div>
            <div class="field">
              <button class="button is-primary" type="submit">Change Password</button>
            </div>
          </form>
        </div>

        <!-- Workout Statistics -->
        <div class="box">
          <h2 class="subtitle">Workout Statistics</h2>
          <div class="content">
            <p><strong>Total Workouts:</strong> {{ workoutStatistics.total }}</p>
            <p><strong>Last Workout Date:</strong> {{ workoutStatistics.lastWorkoutDate }}</p>
            <!-- Add more workout statistics as needed -->
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const profile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com'
});

const passwords = ref({
  current: '',
  new: ''
});

const changePassword = () => {
  console.log('Changing password...');
  // You can add logic to change the password here
};

const workoutStatistics = ref({
  total: 10,
  lastWorkoutDate: '2023-10-15'
});
</script>

<style scoped>
/* Add your scoped CSS styling for this component if needed */
.profile-page {
  padding: 20px;
}
</style>
