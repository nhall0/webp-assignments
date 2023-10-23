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
        <h1 class="title has-text-primary">Goals</h1>
      </div>
    </section>
    
    <div class="side-content" style="z-index: 100;">
      <div class="field">
        <NewGoalCron></NewGoalCron>
      </div>

      <div class="field">
        <label class="label">Current Goals:</label>
        <GoalsList :user-id="user?.id"></GoalsList>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="field">
          <GoalCalendar :user-id="user?.id"></GoalCalendar>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.side-content {
  position: fixed;
  top: 100px;
  left: -200px;
  width: 300px;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: left 0.3s;
}

.side-content:hover {
  left: 0; 
}
</style>