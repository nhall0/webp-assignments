<script lang="ts">
import { defineComponent, ref } from 'vue';
import { type Workout} from '@/model/workouts';
import { type Exercise, getExerciseIndexByName } from '@/model/exercises';
import PrivacyForm from './PrivacyForm.vue';
import ExerciseList from './ExerciseList.vue';

export default defineComponent({
  data() {
    return {
      showModal: ref(false),
      newWorkout: ref<Workout>({
        name: '',
        sets: 0,
        reps: 0,
        privacy: 0,
        exercises: [],
        id: ''
      }),
    };
  },
  components: {
    ExerciseList,
    PrivacyForm
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addWorkout() {
      this.$emit('added', this.newWorkout);
      this.closeModal();
    },
    updatePrivacy(value: number) {
      this.newWorkout.privacy = value;
    },
    addExercise(exercise: Exercise) {
      this.newWorkout.exercises.push(getExerciseIndexByName(exercise.name));
    },
    removeExercise(exercise: Exercise) {
      const index = this.newWorkout.exercises.indexOf(getExerciseIndexByName(exercise.name));
      if (index > -1) {
        this.newWorkout.exercises.splice(index, 1);
      }
    }
  }
});
</script>

<template>
  <div>
    <button @click="openModal" class="create-button button">Create New Workout</button>
    <div v-if="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create New Workout</p>
          <button @click="closeModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="workoutName" class="label">Workout Name:</label>
            <div class="control">
              <input v-model="newWorkout.name" type="text" id="workoutName" class="input" placeholder="Workout Name" />
            </div>
          </div>
          <div class="field">
            <label for="sets" class="label">Sets:</label>
            <div class="control">
              <input v-model="newWorkout.sets" type="number" id="sets" class="input" />
            </div>
          </div>
          <div class="field">
            <label for="reps" class="label">Reps:</label>
            <div class="control">
              <input v-model="newWorkout.reps" type="number" id="reps" class="input" />
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <p class="has-text-weight-bold">Base Exercises</p>
              <ExerciseList @call:back="addExercise" />
            </div>
            <div class="column">
              <p class="has-text-weight-bold">Workout Exercises</p>
              <ExerciseList :exerciseSubList="newWorkout.exercises" @call:back="removeExercise" />
            </div>
          </div>
          <p class="has-text-weight-bold has-text-centered">Visibility</p>
          <PrivacyForm :privacy="newWorkout.privacy" @update:privacy="updatePrivacy" />
        </section>
        <footer class="modal-card-foot">
          <button @click="addWorkout" class="button is-success">Add Workout</button>
          <button @click="closeModal" class="button">Close</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-button {
  background-color: #3273dc;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.create-button:hover {
  background-color: #0749b3;
  color: white;
}

.modal-card {
  max-width: 500px;
  width: 100%;
}

.modal-card-head {
  background-color: #3273dc;
  color: #fff;
}

.modal-card-title {
  color: #fff;
}

.modal-card-body {
  padding: 20px;
}

.modal-card-foot {
  background-color: #f5f5f5;
}

.modal-content {
  background: white;
  border-radius: 5px;
  text-align: center;
}

.has-text-weight-bold {
  font-weight: bold;
}

.has-text-centered {
  text-align: center;
}
</style>