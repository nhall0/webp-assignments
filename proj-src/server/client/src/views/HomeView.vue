<template>
    <div class="home-page">
      <section class="section">
        <div class="container">
          <h1 class="title">Welcome to FitnessHero</h1>
          
          <!-- Featured Workouts Section -->
          <div class="box">
            <h2 class="subtitle">Featured Workouts</h2>
            <ul>
              <li>Workout 1</li>
              <li>Workout 2</li>
              <!-- Add more featured workouts as needed -->
            </ul>
          </div>
  
          <!-- Latest Updates Section -->
          <div class="box">
            <h2 class="subtitle">Latest Updates</h2>
            <ul>
              <li>Update 1</li>
              <li>Update 2</li>
              <!-- Add more latest updates as needed -->
            </ul>
          </div>
  
          <!-- Call to Action -->
          <div class="box cta-box">
            <h2 class="subtitle">Start your fitness journey now!</h2>
            <p>Join FitnessHero to access personalized workouts and track your progress.</p>
            <a href="/signup" class="button is-primary">Get Started</a>
          </div>
  
        </div>
      </section>
    </div>
  </template>
  
  <style scoped>
  /* Add your scoped CSS styling for this component if needed */
  .home-page {
    padding: 20px;
  }
  
  .cta-box {
    text-align: center;
    padding: 30px;
  }
  
  .cta-box a {
    margin-top: 20px;
  }
  </style>
  