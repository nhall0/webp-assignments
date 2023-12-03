<script lang="ts">
import { defineComponent } from 'vue';
import { getSession } from '@/model/session';
import WorkoutListSimple from '@/components/WorkoutListSimple.vue';
import { addPost, type Post } from '@/model/posts';

const session = getSession();

if (!session.user?.id) {
  throw new Error('User not found');
}

export default defineComponent({
  components: {
    WorkoutListSimple,
  },
  methods: {
    selectWorkout(workoutId: string) {
      this.workout = workoutId;
    },
    createPost() {
      this.postDate = (new Date(this.postDate))
        .toLocaleDateString()
        .split('/')
        .map((part, index) => (index === 1 ? +part + 1 : part))
        .join('/');
      
      const post = {
        name: this.postName,
        date: this.postDate,
        workout: this.workout,
        owner: this.user,
        id: ''
      } as Post;
      addPost(post);
      this.$emit('created', post);
    }
  },
  data() {
    const user = session.user || { id: '' };

    return {
      user: user.id,
      postName: '',
      postDate: '',
      workout: ''
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
.post-form {
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

.button {
  width: 100%;
}
</style>