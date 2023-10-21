<template>
    <div v-for="workout in workouts" :key="workout.name" class="column is-one-fifth" style="height: 50vh;">
      <div class="card" style="height: 100%;">
        <div class="card-content">
          <p class="title">{{ workout.name }}</p>
          <div v-for="exercise in workout.exercises" :key="exercise">
            <div class="exercise-item" @mouseover="showModal(exercises[exercise])">
              <p class="subtitle">- {{ exercises[exercise].name }}</p>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Start</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
  
    <modal name="exercise-modal">
    <div v-if="selectedExercise" class="modal-container">
      <h2 class="modal-title">{{ selectedExercise.name }}</h2>
      <p class="modal-description">Description: {{ selectedExercise.description }}</p>
      <p class="modal-muscle-group">Muscle Group: {{ selectedExercise.muscleGroup }}</p>
      <p class="modal-equipment">Equipment Needed: {{ selectedExercise.equipment }}</p>
      <button @click="closeModal" class="modal-close-button">Close</button>
    </div>
  </modal>
  </template>
  
  <style scoped>
  .exercise-item {
    cursor: pointer;
  }
  .modal-container {
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  width: 300px; /* Adjust the width if needed */
  position: fixed;
  top: 50%; /* Position it in the middle vertically */
  left: 0; /* Position it on the left */
  transform: translateY(-50%);
}

.modal-title {
  font-size: 24px;
  color: #333;
  margin: 0 0 10px;
}

.modal-description {
  font-size: 16px;
  color: #555;
}

.modal-muscle-group {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

.modal-equipment {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

.modal-close-button {
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.modal-close-button:hover {
  background-color: #d32f2f;
}
  
  /* Add your styles for the modal */
  </style>
  
  <script lang="ts">
  import { ref, inject } from 'vue';
  import { getSession } from '@/model/session';
  import { getExercises, type Exercise } from '@/model/workouts';
  
    const isModalVisible = ref(true);

    const closeModal = () => {
      isModalVisible.value = false;
    };


  export default {
    data() {
      return {
        selectedExercise: null as Exercise | null,
      };
    },
    methods: {
      showModal(exercise: Exercise) {
        this.selectedExercise = exercise;
      }
    },
    setup() {
      const session = getSession();
      const workouts = ref(session.user?.workouts || []);
      const exercises = getExercises();
  
      return {
        workouts,
        exercises,
        closeModal
      };
    },
  };
  </script>
  