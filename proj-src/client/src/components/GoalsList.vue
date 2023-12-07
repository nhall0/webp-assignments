<script lang="ts">
import { defineComponent } from 'vue';
import { getNextDateFromCron, type Goal } from '@/model/goals';
import EditGoalCron from './EditGoalCron.vue';
import Privacy from './Privacy.vue';

export default defineComponent({
  props: {
    userGoals: {
      type: Array as () => Goal[],
      required: true,
    },
  },
  components: {
    Privacy,
    EditGoalCron
  },
  setup(props, { emit }) {
    const removeGoalById = (goalId: string) => {
      emit('removed', goalId);
    };

    const updateGoal = (goal: Goal) => {
      emit('updated', goal);
    };

    const retrieveNextDateFromCron = (cron: string) => {
      return getNextDateFromCron(cron);
    };

    return {
      removeGoalById,
      updateGoal,
      retrieveNextDateFromCron
    };
  },
});
</script>


<template>
  <div>
    <ul class="goal-list">
      <li v-for="goal in userGoals" :key="goal._id" class="goal-item box">
        <div class="goal-info">
          <h3 class="goal-name is-size-4">{{ goal.name }}</h3>
          <p class="goal-detail"><strong>Next Date:</strong> {{ retrieveNextDateFromCron(goal.repetition) }}</p>
          <p class="goal-detail"><strong>Workout:</strong> {{ goal.workout }}</p>
          <p class="goal-detail">
            <Privacy :privacy="goal.privacy" />
          </p>
          <p class="goal-detail">
            <button class="button is-warning" @click="removeGoalById(goal._id)">Remove</button>
          </p>
          <p class="goal-detail">
            <EditGoalCron :new-goal="goal" @updated="updateGoal"/>
          </p>
        </div>
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
  overflow-y: scroll;
  height: 70vh;
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