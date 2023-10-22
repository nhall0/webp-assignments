<script lang="ts">
import { defineComponent, ref } from 'vue';
import { type Goal } from '@/model/goals';
import { getSession } from '@/model/session';
import { getWorkoutById } from '@/model/workouts';
import PrivacyForm from './PrivacyForm.vue';
import WorkoutListSimple from './WorkoutListSimple.vue';

export default defineComponent({
  data() {
    return {
      showModal: ref(false),
      name: ref(''),
      goals: ref<Goal[]>([]),
      newGoal: ref<Goal>({
        name: '',
        owner: '',
        privacy: 0,
        repetition: '',
        workout: '',
        id: ''
      }),
      selectedTime: '',
      selectedOccurrence: 'daily',
      selectedWeekdays: [],
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    };
  },
  components: {
    PrivacyForm,
    WorkoutListSimple
  },
  methods: {
    selectWorkout(workoutId: string) {
      return getWorkoutById(workoutId);
    },
    showFunctionModal() {
      this.showModal = true;
    },
    closeFunctionModal() {
      this.showModal = false;
      this.name = '';
    },
    makeNewGoal() {
      const name = this.name.trim();
      if (name) {
        this.goals.push(this.newGoal);
        this.name = '';
        this.showModal = false;
      }
    },
    updatePrivacy(privacy: number) {
      return privacy;
    }
  },
  setup() {
    const privacy = ref(0);
    var name = ref('');

    const session = getSession();

    if (!session.user?.id) {
      throw new Error('User not found');
    }

    return { privacy, name, user: session.user.id };
  },
});
</script>

<template>
  <div>
    <button @click="showFunctionModal" class="create-button button">Create New Goal</button>
    <div v-if="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create New Goal</p>
          <button @click="closeFunctionModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="goalName" class="label">Goal Name:</label>
            <div class="control">
              <input v-model="name" type="text" id="goalName" class="input" placeholder="Goal Name" />
            </div>
          </div>

          <div class="field">
            <label class="label">Workout</label>
            <div class="control">
              <WorkoutListSimple :user="user" @selected="selectWorkout" />
            </div>
          </div>

          <div class="field">
            <label class="label">Select Time:</label>
            <div class="control">
              <input class="input" type="time" v-model="selectedTime" />
            </div>
          </div>

          <div class="field">
            <label class="label">Select Occurrence:</label>
            <div class="control">
              <label class="radio">
                <input type="radio" v-model="selectedOccurrence" value="daily" />
                Daily
              </label>
              <label class="radio">
                <input type="radio" v-model="selectedOccurrence" value="weekly" />
                Weekly
              </label>
            </div>
          </div>

          <div v-if="selectedOccurrence === 'weekly'" class="field">
            <label class="label">Select Weekdays:</label>
            <div class="control">
              <label class="checkbox" v-for="(day, index) in daysOfWeek" :key="index">
                <input type="checkbox" v-model="selectedWeekdays" :value="day" />
                {{ day }}
              </label>
            </div>
          </div>

          <PrivacyForm :privacy=newGoal.privacy @update:privacy="updatePrivacy" />


        </section>
        <footer class="modal-card-foot">
          <button @click="makeNewGoal" class="button is-success">Add Goal</button>
          <button @click="closeFunctionModal" class="button">Close</button>
        </footer>
      </div>
    </div>

    <ul>
      <li v-for="(goal, index) in goals" :key="index" class="box">
        {{ goal.name }}
      </li>
    </ul>
  </div>
</template>  

<style scoped>
.schedule-creator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.label {
  font-weight: bold;
  margin-bottom: 10px;
}

.input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.radio {
  margin-right: 10px;
}

.checkbox {
  margin-right: 10px;
}
</style>