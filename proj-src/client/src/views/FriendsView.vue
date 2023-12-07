<script setup lang="ts">
import FriendsList from '@/components/FriendsList.vue';
import { getSession } from '@/model/session';
import { ref } from 'vue';
import { getFriendsByUser, addFriend, removeFriend } from '@/model/users';

const user = getSession().user;

if (!user) {
  throw new Error('User is not logged in');
}

const friends = ref([]);
const searchEmail = ref('');

const fetchFriends = async () => {
  try {
    friends.value = await getFriendsByUser();
  } catch (error) {
    console.error('Error fetching friends:', error);
  }
};

const addFriendWrapper = async (email: string) => {
  try {
    await addFriend(email);
    await fetchFriends();
  } catch (error) {
    console.error('Error adding friend:', error);
    alert('Error adding friend');
  }
};

fetchFriends();
</script>

<template>
  <div class="friends-page">
    <section class="section">
      <div class="container">
        <h1 class="title has-text-success">Your Friends</h1>

        <div class="search-bar">
          <input class="input" type="text" placeholder="Enter your friends email." v-model="searchEmail" />
        </div>

        <div class="add-friend">
          <button class="button is-success" @click="addFriendWrapper(searchEmail)">Add Friend</button>
        </div>

        <FriendsList />
      </div>
    </section>
  </div>
</template>

<style scoped></style>
