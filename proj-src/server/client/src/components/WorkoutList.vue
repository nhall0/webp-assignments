<script lang="ts">
import { defineComponent } from 'vue';
import {type Workout} from '@/model/workouts';
import Privacy from '@/components/Privacy.vue';
import ExerciseList from '@/components/ExerciseList.vue';
import EditWorkout from './EditWorkout.vue';

export default defineComponent ({
  props: {
    workouts: {
      type: Array as () => Workout[],
      required: true
    },
  },
  components: {
    ExerciseList,
    Privacy,
    EditWorkout
  },
  methods: {
    removeLocalWorkout(workoutId: string) {
      this.$emit('removed', workoutId);
    },
    updateLocalWorkout(workout: Workout) {
      this.$emit('updated', workout);
    }
  }
});
</script>

<template>
  <div>
    <div class="columns is-multiline" style="margin-top: 20px;">
      <div class="column is-one-quarter" v-for="workout in workouts" :key="workout.id">
        <div class="square-card">
          <div class="card-content">
            <p class="title is-4 has-text-primary">{{ workout.name }}</p>
            <div class="content">
              <p><strong>Exercises:</strong>
                <ExerciseList :exerciseSubList="workout.exercises" />
              </p>
              <p><strong>Sets:</strong> {{ workout.sets }}</p>
              <p><strong>Reps:</strong> {{ workout.reps }}</p>
              <p>
                <Privacy :privacy="workout.privacy" />
              </p>
              <p>
                <EditWorkout :newWorkout="workout" @updated="updateLocalWorkout"/>
              </p>
              <p>
                <button class="button is-warning" @click="removeLocalWorkout(workout.id)">Remove</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.square-card {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.2s;
  position: relative;
  min-width: 200;
}

.has-text-primary {
  color: #3273dc;
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
</style>
