<script lang="ts">
import { defineComponent } from 'vue';
import { getGoalByIds, getNextDateFromCron } from '@/model/goals';
import { getUserById } from '@/model/users';
import { getWorkoutById } from '@/model/workouts';
import EditGoalCron from './EditGoalCron.vue';

import Privacy from './Privacy.vue';

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  components: {
    Privacy,
    EditGoalCron
  },
  methods: {
    getWorkoutName(workoutId: string) {
      const workout = getWorkoutById(workoutId);
      return workout?.name;
    },
    getNextDateFromCron(cron: string) {
      return getNextDateFromCron(cron);
    }
  },
  computed: {
    userGoals() {
      const user = getUserById(this.userId);
      if (!user) {
        throw new Error(`User with id ${this.userId} not found`);
      }
      const goals = getGoalByIds(user.goals);
      if (!goals) {
        throw new Error(`Goals for user with id ${this.userId} not found`);
      }
      return goals; 
    }
    }
});
</script>

<template>
  <div>
    <ul class="goal-list">
      <li v-for="(goal) in userGoals" :key="goal.name" class="goal-item box">
        <div class="goal-info">
          <h3 class="goal-name is-size-4">{{ goal.name }}</h3>
          <p class="goal-detail"><strong>Next Date:</strong> {{ getNextDateFromCron(goal.repetition) }}</p>
          <p class="goal-detail"><strong>Workout:</strong> {{ getWorkoutName(goal.workout) }}</p>
          <p class="goal-detail">
            <Privacy :privacy="goal.privacy" />
          </p>
        </div>
        <EditGoalCron :new-goal="goal" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.has-text-primary {
  color: #3273dc;
}

.goal-list {
  list-style-type: none;
  padding: 0;
}

.goal-item {
  max-width: 400px;
  background-color: #f5f5f5;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.goal-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.goal-name {
  font-size: 20px;
  margin-bottom: 5px;
}

.goal-detail {
  font-size: 16px;
  margin: 5px 0;
}

button {
  margin-top: 10px;
}
</style>