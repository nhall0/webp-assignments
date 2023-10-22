<template>
  <div class="fitness-goals-page">
    <section class="section">
      <div class="container">
        <h1 class="title">My Goals</h1>
        
        <!-- Set Fitness Goals Section -->
        <div class="box">
          <h2 class="subtitle">Set Your Fitness Goals</h2>
          <form @submit.prevent="setFitnessGoals">
            <div class="field">
              <label class="label">Goal 1</label>
              <div class="control">
                <input class="input" type="text" v-model="goals.goal1" placeholder="Enter your first fitness goal">
              </div>
            </div>
            <div class="field">
              <label class="label">Goal 2</label>
              <div class="control">
                <input class="input" type="text" v-model="goals.goal2" placeholder="Enter your second fitness goal">
              </div>
            </div>
            <!-- Add more goals as needed -->
            <div class="field">
              <button class="button is-primary" type="submit">Set Goals</button>
            </div>
          </form>
        </div>

        <!-- View Fitness Goals Section -->
        <div class="box">
          <h2 class="subtitle">Your Fitness Goals</h2>
          <ul>
            <li><strong>Goal 1:</strong> {{ goals.goal1 }}</li>
            <li><strong>Goal 2:</strong> {{ goals.goal2 }}</li>
            <!-- Display more goals as needed -->
          </ul>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const goals = ref({
  goal1: '',
  goal2: ''
});

const setFitnessGoals = () => {
  console.log('Setting fitness goals:', goals.value);
  // You can add logic to set the fitness goals here
};
</script>

<style scoped>
/* Add your scoped CSS styling for this component if needed */
.fitness-goals-page {
  padding: 20px;
}
</style>
