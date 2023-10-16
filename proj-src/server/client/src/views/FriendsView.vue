<template>
  <div class="friends-page">
    <section class="section">
      <div class="container">
        <h1 class="title">Friends</h1>
        
        <!-- Friends List -->
        <div class="columns is-multiline">
          <div v-for="(friend, index) in friends" :key="index" class="column is-one-third">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="profile_icon.png" alt="Profile Icon"> <!-- Replace with actual profile icon -->
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ friend.name }}</p>
                    <p class="subtitle is-6">{{ friend.email }}</p>
                  </div>
                </div>
                <div class="content">
                  <p><strong>Signup Date:</strong> {{ friend.signupDate }}</p>
                  <!-- Add more friend information as needed -->
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const friends = ref([
  { name: 'Friend 1', email: 'friend1@example.com', signupDate: '2023-10-10' },
  { name: 'Friend 2', email: 'friend2@example.com', signupDate: '2023-10-12' },
  // Add more friends as needed
]);
</script>

<style scoped>
/* Add your scoped CSS styling for this component if needed */
.friends-page {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}
</style>
