<script setup lang="ts">
import FriendsList from '@/components/FriendsList.vue';

</script>

<template>
  <div class="friends-page">
    <section class="section">
      <div class="container">
        <h1 class="title">Your Friends</h1>
        
        <div class="search-bar">
          <input class="input" type="text" placeholder="Search for friends..." />
        </div>
        
        <FriendsList />
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
