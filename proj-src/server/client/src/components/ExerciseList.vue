<script lang="ts">
import { getExercises} from '@/model/exercises';

export default {
  props: {
    exerciseSubList: {
      type: Array as () => number[],
      required: false,
    },
    callBack: {
      type: Function,
      required: false,
    },
  },
  setup() {
    return {
       getExercises
    };
  },
};
</script>

<template>
  <div class="exercise-list">
    <button v-for="exercise in getExercises(exerciseSubList)" :key="exercise.name">
      {{ exercise.name }}
    </button>
  </div>
</template>

<style scoped>
.exercise-list {
  max-height: 400px; /* Add a maximum height to enable a scrollbar */
  max-width: 400px; /* Set a maximum width */
  overflow-y: auto; /* Enable vertical scrollbar when content overflows */
  background-color: #fff; /* Set a white background color */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px; /* Add border radius for rounded corners */
  padding: 10px; /* Add some padding */
}

/* Add Bulma classes for list items */
.exercise-list button {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block; /* Display the items vertically */
  width: 95%; /* Make the items take the full width */
  text-align: left; /* Align text to the left */
}

/* Style for button hover state */
.exercise-list button:hover {
  background-color: #e0e0e0;
}
</style>