<script lang="ts">
import { defineComponent } from 'vue';
import PostList from '@/components/PostList.vue';
import NewPost from '@/components/NewPost.vue';
import { getSession } from '@/model/session';

const session = getSession();
const user = session.user;

if (!user) {
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
        <h1 class="title has-text-primary">FitnessHero</h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-variable is-5 " >
          <div class="column is-half-desktop is-half-tablet is-full-mobile" style="height: 100%;">
            <div class="custom-box">
              <h2 class="custom-subtitle">Your Feed</h2>
              <PostList :userIds="allIds" />
            </div>
          </div>
          <div class="column is-half-desktop is-half-tablet is-full-mobile" style="height: 100%;">
            <div class="custom-box">

              <NewPost />
              <PostList :userIds="userIds" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.custom-box {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 100vh;
}

.custom-subtitle {
  font-size: 1.5rem;
  color: #555;
}

.column {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>