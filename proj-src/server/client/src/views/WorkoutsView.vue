<script lang="ts">

import Exercises from "@/components/Exercises.vue";
export default {
  components: {
    Exercises
  },
  // Other component properties
};
</script>

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
        <Exercises />
    
      </div>
    </div>
  </section>

  <!-- Other content after workouts -->
</template>

<style scoped>
.fitness-hero {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
