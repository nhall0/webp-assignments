<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';
import {
  postNewGoal,
  removeGoal,
  getGoalsByUser,
  type Goal,
} from '@/model/goals';

const session = getSession();
const user = session?.user;

if (!user) {
  throw new Error('User not logged in');
}

const goals = ref<Goal[]>([]);

const fetchGoals = async () => {
  try {
    const fetchedGoals = await getGoalsByUser(user.id);
    goals.value = fetchedGoals;
  } catch (error) {
    console.error('Error fetching goals:', error);
  }
};

const addGoal = (newGoal: Goal) => {
  postNewGoal(newGoal);
};

const removeLocalGoal = (goalId: string) => {
  removeGoal(goalId);
};

const updateLocalGoal = (updatedGoal: Goal) => {
  postNewGoal(updatedGoal);
  fetchGoals();
};

fetchGoals();

</script>

<template>
  <div class="fitness-goals-page">
    <section class="section">
      <div class="container">
        <h1 class="title has-text-primary">Goals</h1>
      </div>
    </section>
    
    <div class="side-content" style="z-index: 100;">
      <div class="field">
        <NewGoalCron :user="user.id" @added="addGoal"></NewGoalCron>
      </div>

      <div class="field">
        <label class="label">Current Goals:</label>
        <GoalsList :user-goals="goals" @removed="removeLocalGoal" @updated="updateLocalGoal"></GoalsList>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="field">
          <GoalCalendar :user-goals="goals"></GoalCalendar>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.side-content {
  border-right: 20px solid #0084ff;
  position: fixed;
  top: 100px;
  left: -280px;
  width: 300px;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: left 0.3s;
}

.side-content:hover {
  border-right: 10px solid #0084ff;
  left: 0; 
}
</style>