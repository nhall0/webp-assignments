<script lang="ts">
import { defineComponent } from 'vue';
import { getSession } from '@/model/session';
import WorkoutListSimple from '@/components/WorkoutListSimple.vue';
import { getWorkoutById } from '@/model/workouts';

const session = getSession();

if(!session.user?.id) {
  throw new Error('User not found');
}

export default defineComponent({
    components: {
        WorkoutListSimple,
    },
    methods: {
        selectWorkout(workoutId: string) {
            return getWorkoutById(workoutId);
        },
        createPost() {
            console.log(this.postName);
            console.log(this.postDate);
        }
    },
  setup() {
    const user = session.user || { id: '' };

    return {
        user: user.id,
        postName: '',
        postDate: '',
    };
  },
});
</script>

<template>
    <div class="post-form">
      <h2 class="title">New Post</h2>
      <div class="field">
        <label class="label">Workout</label>
        <div class="control">
            <WorkoutListSimple :user="user" @selected="selectWorkout" />
        </div>
      </div>
      <div class="field">
        <label class="label">Post Name</label>
        <div class="control">
          <input v-model="postName" class="input" type="text" placeholder="Enter post name" />
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input v-model="postDate" class="input" type="date" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button @click="createPost" class="button is-primary">Create Post</button>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>

</style>