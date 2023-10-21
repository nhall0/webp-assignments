<script lang="ts">
import {getWorkoutsFromUser} from '@/model/workouts';
import ExerciseList from '@/components/ExerciseList.vue';

export default {
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  components: {
    ExerciseList,
  },
  setup() {
    return {
      getWorkoutsFromUser
    };
  },
};
</script>

<template>
  <div>
    <ul>
      <li v-for="workout in getWorkoutsFromUser(user)" :key="workout.id">
        <div class="workout-card">
          <h2>{{ workout.name }}</h2>
          <p><strong>Exercises:</strong> <ExerciseList :exerciseSubList="workout.exercises"/></p>
          <p><strong>Sets:</strong> {{ workout.sets }}</p>
          <p><strong>Reps:</strong> {{ workout.reps }}</p>
          <p><strong>Privacy:</strong> {{ workout.privacy }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.workout-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>