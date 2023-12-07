<script setup lang="ts">
import { ref, watch} from 'vue';
import { getFriendsByUser, type User, removeFriend } from '@/model/users';

let friends = ref<User[]>([]);

async function removeFriendWrapper(friend: string) {
  await removeFriend(friend);
  loadFriends()
}

async function loadFriends() {
  await getFriendsByUser().then((res) => {
    if (res) {
      friends.value = res;
    }
  });
}

watch(() => friends, () => {
  console.log(friends.value)
})

loadFriends();

</script>

<template>
  <div class="friends-page">
    <section class="section">
      <div class="container">
        <div class="box friends-box">
          <h2 class="subtitle">Friends List</h2>
          <ul>
            <li v-for="friend in friends" :key="friend._id">
              <div class="friend-card">
              <p><strong>Username:</strong> {{ friend.username }}</p>
              <p><strong>Email:</strong> {{ friend.email }}</p>
              <p><strong>First Name:</strong> {{ friend.firstName }}</p>
              <p><strong>Last Name:</strong> {{ friend.lastName }}</p>
              <button @click="removeFriendWrapper(friend._id)">Remove Friend</button>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
  
<style scoped>
.friends-box {
  border: 2px solid #00D1B2;
  border-radius: 10px;
  margin: 20px 0;
  padding: 20px;
}

.friend-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.friend-card p {
  margin: 0;
}

button {
  background-color: #FF3860;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #FF1B41;
}
</style>