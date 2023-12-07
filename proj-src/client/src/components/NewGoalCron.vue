<script lang="ts">
import { defineComponent, ref } from 'vue';
import { type Goal } from '@/model/goals';
import PrivacyForm from './PrivacyForm.vue';
import WorkoutListSimple from './WorkoutListSimple.vue';

export default defineComponent({
  props: {
    user: {
      type: String,
      required: true
    }
  },
  components: {
    PrivacyForm,
    WorkoutListSimple
  },
  setup(props, {emit}) {
    const showModal = ref(false);
    const newGoal = ref<Goal>({
      name: '',
      privacy: 0,
      repetition: '',
      workout: '',
      _id: '',
      user_id: ''
    });
    const selectedTime = ref('');
    const selectedOccurrence = ref('daily');
    const selectedWeekdays = ref<string[]>([]);
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const selectWorkout = (workoutId: string) => {
      newGoal.value.workout = workoutId;
    };

    const showFunctionModal = () => {
      showModal.value = true;
    };

    const closeFunctionModal = () => {
      showModal.value = false;
    };

    const makeNewGoal = () => {
      const hour = selectedTime.value.split(':')[0];
      if (selectedOccurrence.value === 'daily') {
        newGoal.value.repetition = `0 ${hour} * * *`;
      } else if (selectedOccurrence.value === 'weekly') {
        newGoal.value.repetition = `0 ${hour} * * ${selectedWeekdays.value.join(',')}`;
      }
      emit('added', newGoal.value);
      closeFunctionModal();
    };

    const updatePrivacy = (privacy: number) => {
      newGoal.value.privacy = privacy;
      return privacy;
    };

    return {
      showModal,
      newGoal,
      selectedTime,
      selectedOccurrence,
      selectedWeekdays,
      daysOfWeek,
      selectWorkout,
      showFunctionModal,
      closeFunctionModal,
      makeNewGoal,
      updatePrivacy
    };
  }
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
              <input v-model="newGoal.name" type="text" id="goalName" class="input" placeholder="Goal Name" />
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
  </div>
</template>  

<style scoped>
.create-button {
  background-color: rgb(45, 45, 255);
  color: white;
  margin-bottom: 20px;
}

.modal {
  z-index: 1000;
}
.modal-card {
  max-width: 600px;
}
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