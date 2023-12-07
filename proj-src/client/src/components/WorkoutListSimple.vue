<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getWorkoutsFromUser, type Workout } from '@/model/workouts';

export default defineComponent({
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const workouts = ref<Workout[]>([]);
    const selectedWorkoutId = ref<string>('');

    const onSelect = (workoutId: string) => {
      selectedWorkoutId.value = workoutId;
      context.emit('selected', workoutId);
    };

    const fetchWorkouts = async () => {
      try {
        workouts.value = await getWorkoutsFromUser(props.user);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    onMounted(fetchWorkouts);

    return {
      workouts,
      selectedWorkoutId,
      onSelect,
    };
  },
});
</script>

<template>
  <div>
    <div class="workout-list">
      <button v-for="workout in workouts" :key="workout._id" @click="onSelect(workout._id)" :class="['button',{ 'is-info': workout._id !== selectedWorkoutId }, { 'is-selected': workout._id === selectedWorkoutId }]"> {{ workout.name }} </button>
    </div>
  </div>
</template>

<style scoped>
.workout-list {
  display: flex;
  flex-direction: column;
  max-height: 150px;
  overflow-y: auto;
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
  background-color: #235aac;
}

.is-selected {
  background-color: #2152a0;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
