<script setup lang="ts">
import { ref } from 'vue';
import WorkoutList from '@/components/WorkoutList.vue';
import NewWorkout from '@/components/NewWorkout.vue';
import { getSession } from '@/model/session';
import { getWorkoutsFromUser, type Workout, removeWorkout, postNewWorkout } from '@/model/workouts';

const user = getSession().user;
if (!user) {
  throw new Error('user is required');
}

var workouts = ref(getWorkoutsFromUser(user.id));

const addLocalWorkout = (workout: Workout) => {
  postNewWorkout(workout, user.id);
  workouts.value.push(workout);
}

const removeLocalWorkout = (workoutId: string) => {
  removeWorkout(workoutId, user.id);
  workouts.value = workouts.value.filter(w => w.id !== workoutId);
}

const updateLocalWorkout = (workout: Workout) => {
  postNewWorkout(workout, user.id);
  const index = workouts.value.findIndex(w => w.id === workout.id);
  workouts.value[index] = workout;

  workouts = ref(workouts.value);
}
</script>

<template>
  <section class="section">
    <h1 class="title has-text-primary">Workouts</h1>
    <NewWorkout :user="user.id" @added="addLocalWorkout" />
    <WorkoutList :workouts="workouts" @removed="removeLocalWorkout" @updated="updateLocalWorkout"/>
  </section>
</template>

<style scoped>
.fitness-hero {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>