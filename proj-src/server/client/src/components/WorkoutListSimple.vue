<template>
  <div>
    <div class="workout-list">
      <button
        v-for="workout in workouts"
        :key="workout.id"
        @click="onSelect(workout.id)"
        :class="['button', 'is-info', { 'is-selected': workout.id === selectedWorkoutId }]"
      >
        {{ workout.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getWorkoutsFromUser, type Workout } from '@/model/workouts';

export default defineComponent({
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const workouts = ref<Workout[]>(getWorkoutsFromUser(props.user));
    const selectedWorkoutId = ref('');

    const onSelect = (workoutId: string) => {
      selectedWorkoutId.value = workoutId;
    };

    return {
      workouts,
      selectedWorkoutId,
      onSelect,
    };
  },
});
</script>

<style scoped>
.workout-list {
  display: flex;
  flex-direction: column;
  max-height: 200px; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Enable vertical scrollbar for overflow */
  gap: 10px;
  margin-top: 20px;
}

.button.is-info {
  background-color: #3273dc;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button.is-info:hover {
  background-color: #275aa8;
}

.is-selected {
  background-color: #071a3c; /* Change this color to your preferred darker color */
}
</style>
