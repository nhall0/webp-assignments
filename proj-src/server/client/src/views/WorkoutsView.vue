<template>
  <!-- Other content before workouts -->

  <section class="section">
    <div class="panel">
      <p class="panel-heading">Workouts</p>

      <div class="columns is-multiline"> <!-- Use columns and is-multiline for horizontal stacking -->
        
        <!-- Create a new workout card -->
        <div class="column is-one-fifth" style="height: 50vh;">
          <div class="card" style="background-color: rgb(146, 255, 96); text-align: center; height: 100%;">
            <div class="card-content">
              <p class="title">New workout</p>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Create</a>
            </footer>
          </div>
        </div>

        <!-- Other workout cards -->
        <div v-for="workout in workouts" :key="workout.id" class="column is-one-fifth" style="height: 50vh;">
          <div class="card" style="height: 100%;">
            <div class="card-content">
              <p class="title">{{ workout.name }}</p>
              <p class="subtitle">{{ workout.date }}</p>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Start</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Other content after workouts -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Workout {
  id: number;
  name: string;
  date: string;
}

const workouts = [] as Workout[];

for (let i = 1; i <= 20; i++) {
  const workout = {
    id: i,
    name: `Workout ${i}`,
    date: `${i % 12 + 1}/10/2021`, // Dates from 1/10/2021 to 12/10/2021
  };
  workouts.push(workout);
}

export default defineComponent({
  data() {
    return {
      workouts
    };
  },
});
</script>

<style scoped>
.fitness-hero {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
