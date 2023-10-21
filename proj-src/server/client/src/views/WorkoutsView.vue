<script setup lang="ts">
import WorkoutList from '@/components/WorkoutList.vue';
import NewWorkout from '@/components/NewWorkout.vue';
import { getSession } from '@/model/session';

const user = getSession().user;
if(!user) {
  throw new Error('user is required');
}

</script>
<template>
  <section class="section">
    <div class="panel">
      <p class="panel-heading">New Workout</p>
      <NewWorkout :user=user.id />
    </div>
    <div class="panel">
      <p class="panel-heading">Workouts</p>
        <WorkoutList :user=user.id />
    </div>
  </section>
</template>

<style scoped>
.fitness-hero {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
