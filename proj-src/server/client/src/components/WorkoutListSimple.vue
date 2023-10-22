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
  methods:{
    onSelect(workoutId: string) {
      this.selectedWorkoutId = workoutId;
      this.$emit('selected', workoutId);
    }
  },
  setup(props) {
    const workouts = ref<Workout[]>(getWorkoutsFromUser(props.user));
    const selectedWorkoutId = ref('');

    return {
      workouts,
      selectedWorkoutId
    };
  },
});
</script>

<template>
  <div>
    <div class="workout-list">
      <button v-for="workout in workouts" :key="workout.id" @click="onSelect(workout.id)" :class="['button',{ 'is-info': workout.id !== selectedWorkoutId }, { 'is-selected': workout.id === selectedWorkoutId }]"> {{ workout.name }} </button>
    </div>
  </div>
</template>

<style scoped>
.workout-list {
  display: flex;
  flex-direction: column;
  max-height: 200px;
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
