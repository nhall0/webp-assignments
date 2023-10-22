<script lang="ts">
import { defineComponent } from 'vue';
import PostList from '@/components/PostList.vue';
import NewPost from '@/components/NewPost.vue';
import { getSession } from '@/model/session';

const session = getSession();
const user = session.user;

if(!user) {
  throw new Error('User not found');
}

export default defineComponent({
  components: {
    PostList,
    NewPost
  },
  setup() {
    return {
      userIds: [user.id],
      allIds: [user.id, ...user.friends]
    };
  },
});

</script>

<template>
  <div class="home-page">
    <section class="section">
      <div class="container">
        <h1 class="title">My Feed</h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="box">
              <h2 class="subtitle">Create a New Session</h2>
              <NewPost />
            </div>

            <div class="box">
              <h2 class="subtitle">Your Activity</h2>
              <PostList :userIds="userIds" />
            </div>
          </div>

          <div class="column">
            <div class="box">
              <h2 class="subtitle">Your Friends Activity</h2>
              <PostList :userIds="allIds" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<style scoped>
/* Add your scoped CSS styling for this component */
.home-page {
  padding: 20px;
}

.box {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5rem;
  color: #555;
}

.column.is-two-thirds {
  background-color: #f5f5f5;
}

.column.is-two-thirds .box {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.column {
  background-color: #eaeaea;
}

.column .box {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Add more styles as needed */
</style>