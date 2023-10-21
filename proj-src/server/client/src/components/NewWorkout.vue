<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {type Workout} from '@/model/workouts';
  import Privacy from './Privacy.vue';
  import ExerciseList from './ExerciseList.vue';
  
  export default defineComponent({
    data() {
      return {
        showModal: ref(false),
        newWorkoutName: ref(''),
        workouts: ref<Workout[]>([]),
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
      Privacy
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.newWorkoutName = '';
      },
      addWorkout() {
        const name = this.newWorkoutName.trim();
        if (name) {
          this.workouts.push(this.newWorkout);
          this.newWorkoutName = '';
          this.showModal = false;
        }
      },
      updatePrivacy(value: number) {
      this.newWorkout.privacy = value;
    }
    },
  });
</script>

<template>
  <div>
    <button @click="openModal" class="create-button button is-success">Create New Workout</button>
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
          <Privacy :privacy="newWorkout.privacy" @update:privacy="updatePrivacy" />
        </section>
        <footer class="modal-card-foot">
          <button @click="addWorkout" class="button is-success">Add Workout</button>
          <button @click="closeModal" class="button">Close</button>
        </footer>
      </div>
    </div>

    <ul>
      <li v-for="(workout, index) in workouts" :key="index" class="box">
        {{ workout.name }} (Sets: {{ workout.sets }}, Reps: {{ workout.reps }}, Privacy: {{ workout.privacy }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.create-button {
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
