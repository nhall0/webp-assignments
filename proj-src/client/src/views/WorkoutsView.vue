<script setup lang="ts">
import { ref } from 'vue';
import WorkoutList from '@/components/WorkoutList.vue';
import NewWorkout from '@/components/NewWorkout.vue';
import { getSession } from '@/model/session';
import { getWorkoutsFromUser, type Workout, removeWorkout, postNewWorkout, updateWorkout } from '@/model/workouts';

const user = getSession().user;
if (!user) {
  throw new Error('user is required');
}

var workouts = ref<Workout[]>([]);

const fetchWorkouts = async () => {
  try {
    const fetchedWorkouts = await getWorkoutsFromUser(user._id);
    workouts.value = fetchedWorkouts;
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
};

const addLocalWorkout = (workout: Workout) => {
  postNewWorkout(workout);
  fetchWorkouts();
}

const removeLocalWorkout = (workoutId: string) => {
  removeWorkout(workoutId);
  fetchWorkouts();
}

const updateLocalWorkout = (workout: Workout) => {
  updateWorkout(workout);
  fetchWorkouts();
}

fetchWorkouts();
</script>

<template>
  <section class="section">
    <h1 class="title has-text-primary">Workouts</h1>
    <NewWorkout :user="user._id" @added="addLocalWorkout" />
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