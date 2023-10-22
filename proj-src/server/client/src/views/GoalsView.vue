<script lang="ts">
import { defineComponent } from 'vue';

import NewGoalCron from '@/components/NewGoalCron.vue';
import GoalsList from '@/components/GoalsList.vue';
import GoalCalendar from '@/components/GoalCalendar.vue';
import { getSession } from '@/model/session';


export default defineComponent({
  components: {
    NewGoalCron,
    GoalsList,
    GoalCalendar
  },
  setup() {
    const session = getSession().user;

    if (!session) {
      throw new Error('Session not found');
    }
    const user = session;
    return { user: user };
  }
});

</script>

<template>
  <div class="fitness-goals-page">
    <section class="section">
      <div class="container">
        <h1 class="title">My Goals</h1>

        <div class="field">
          <label class="label">Make a new goal:</label>
          <NewGoalCron></NewGoalCron>
        </div>

        <div class="field">
          <label class="label">My goals:</label>
          <GoalsList :user-id="user?.id"></GoalsList>
        </div>

        <div class="field">
          <label class="label">Goal schedule:</label>
          <GoalCalendar :user-id="user?.id"></GoalCalendar>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fitness-goals-page {
  padding: 20px;
}
</style>
