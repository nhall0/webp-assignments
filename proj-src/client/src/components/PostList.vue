<script lang="ts">
import { defineComponent, ref , watch} from 'vue';
import { type Post } from '@/model/posts';

export default defineComponent({
  props: {
    userPostsProp: {
      type: Array as () => Post[],
      required: true
    },
    viewHeight: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const userPosts = ref<Post[]>([]); 

    watch(() => props.userPostsProp, () => {
      userPosts.value = props.userPostsProp;
    });

    return {
      userPosts
    };
  }
});
</script>

<template>
  <div :style="{ height: viewHeight }" class="post-list">
    <h2 class="subtitle"><i class="fas fa-clipboard-list"></i> Posts</h2>
    <ul>
      <li v-for="post in userPosts" :key="post._id" class="post-item">
        <div class="post-info">
          <div class="post-title">
            <i class="fas fa-user"></i>
            <strong>{{ post.owner_name}}</strong>
          </div>
          <div class="workout-info">
            <i class="fas fa-dumbbell"></i>
            <p>{{ post.workout }}</p>
          </div>
          <div class="date-info">
            <i class="far fa-calendar-alt"></i>
            <p>{{ post.date }}</p>
          </div>
        </div>
        <div class="post-content">
          <p>{{ post.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
  
<style scoped>
.post-list {
  padding: 20px;
  min-width: 200;
  overflow-y: scroll;
  height: 50%;
}

.post-item {
  background-color: #f3f3f3;
  border-radius: 8px;
  margin: 10px 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.post-title,
.workout-info,
.date-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.post-title i,
.workout-info i,
.date-info i {
  margin-right: 5px;
  font-size: 1.2rem;
  color: #3498db;
}

.post-title i {
  color: #e74c3c;
}

.post-content {
  color: #333;
}

.subtitle {
  font-size: 1.5rem;
  color: #555;
}
</style>
  