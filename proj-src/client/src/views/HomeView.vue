<script setup lang="ts">
import { ref, watch } from 'vue';
import PostList from '@/components/PostList.vue';
import NewPost from '@/components/NewPost.vue';
import { getSession } from '@/model/session';
import { getPostsByUsers, type Post, addPost } from '@/model/posts';

const session = getSession();
const user = session?.user;

if (!user) {
  throw new Error('User not logged in');
}

const userPosts = ref<Post[]>([]);
const friendPosts = ref<Post[]>([]);

const fetchPosts = async () => {
  friendPosts.value = await getPostsByUsers([user._id, ...user.friends]);
  userPosts.value = friendPosts.value.filter((post) => post.owner_name === user.username);
};

const addPostWrapper = (newPost: Post) => {
  addPost(newPost).then(() => fetchPosts());
};

fetchPosts();
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
              <PostList :userPostsProp="friendPosts" :viewHeight="'90%'" />
            </div>
          </div>
          <div class="column is-half-desktop is-half-tablet is-full-mobile" style="height: 100%;">
            <div class="custom-box">

              <NewPost @created="addPostWrapper"/>
              <PostList :userPostsProp="userPosts" :viewHeight="'45%'"/>
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