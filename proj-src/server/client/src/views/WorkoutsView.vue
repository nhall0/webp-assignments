<script setup lang="ts">
import WorkoutList from '@/components/WorkoutList.vue';
import NewWorkout from '@/components/NewWorkout.vue';
import { getSession } from '@/model/session';

const user = getSession().user;
if (!user) {
  throw new Error('user is required');
}

</script>

<template>
  <section class="section">
    <h1 class="title has-text-primary">Workouts</h1>
    <NewWorkout :user="user.id" />
    <WorkoutList :user="user.id" />
  </section>
</template>

<style scoped>
.fitness-hero {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>