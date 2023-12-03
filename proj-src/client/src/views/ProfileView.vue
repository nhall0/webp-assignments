<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';
import { getPostsByUsers } from '@/model/posts';
import { getGoalByIds } from '@/model/goals';

const user = getSession().user;
if (!user) {
  throw new Error('User is not logged in');
}

const profile = ref({
  name: user.firstName + ' ' + user.lastName,
  email: user.email
});

const passwords = ref({
  current: '',
  new: ''
});

const changePassword = () => {
  console.log('Changing password...');
};

const posts = getPostsByUsers([user.id]);
var lastWorkoutDate = '';
if(posts.length > 0) {
  const lastPost = posts[0];
  if(lastPost.date) {
    lastWorkoutDate = lastPost.date;
  }
}

const goals = getGoalByIds(user.goals);

const workoutStatistics = ref({
  total: user.workouts.length,
  lastWorkoutDate,
  goalCount: goals.length
});
</script>

<template>
  <div class="profile-page">
    <section class="section">
      <div class="container">
        <h1 class="title has-text-success">Your Profile</h1>

        <div class="box profile-box">
          <h2 class="subtitle">Profile Information</h2>
          <div class="content">
            <p><strong>Name:</strong> {{ profile.name }}</p>
            <p><strong>Email:</strong> {{ profile.email }}</p>
          </div>
        </div>


        <div class="box profile-box">
          <h2 class="subtitle">Change Password</h2>
          <form @submit.prevent="changePassword">
            <div class="field">
              <label class="label">Current Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" v-model="passwords.current"
                  placeholder="Enter your current password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">New Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" v-model="passwords.new" placeholder="Enter your new password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success" type="submit">
                <span class="icon is-small">
                  <i class="fas fa-key"></i>
                </span>
                <span>Change Password</span>
              </button>
            </div>
          </form>
        </div>

        <div class="box profile-box">
          <h2 class="subtitle">Workout Statistics</h2>
          <div class="content">
            <p><strong>Total Workouts:</strong> {{ workoutStatistics.total }}</p>
            <p><strong>Last Workout Date:</strong> {{ workoutStatistics.lastWorkoutDate }}</p>
            <p><strong>Goals:</strong> {{ workoutStatistics.goalCount }}</p>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-box {
  border: 2px solid #00D1B2;
  border-radius: 10px;
  margin: 20px 0;
  padding: 20px;
}

.icon.is-small {
  margin-right: 5px;
}
</style>
