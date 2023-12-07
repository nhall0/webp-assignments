<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getSession } from '@/model/session';
import WorkoutListSimple from '@/components/WorkoutListSimple.vue';
import { type Post } from '@/model/posts';

export default defineComponent({
  components: {
    WorkoutListSimple,
  },
  setup(_, context) {
    const session = getSession();

    if (!session.user?._id) {
      throw new Error('User not found');
    }

    const user = ref(session.user?._id || '');
    const postName = ref('');
    const postDate = ref('');
    const workout = ref('');

    const selectWorkout = (workoutId: string) => {
      workout.value = workoutId;
    };

    const createPost = () => {
      const processedPostDate = new Date(postDate.value)
        .toLocaleDateString()
        .split('/')
        .map((part, index) => (index === 1 ? +part + 1 : part))
        .join('/');

      const post: Post = {
        name: postName.value,
        date: processedPostDate,
        workout: workout.value,
        owner: user.value
      };

      context.emit('created', post); 
    };

    return {
      user,
      postName,
      postDate,
      workout,
      selectWorkout,
      createPost,
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