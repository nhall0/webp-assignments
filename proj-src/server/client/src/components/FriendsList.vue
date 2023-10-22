<template>
    <div class="friends-page">
      <section class="section">
        <div class="container">  
          <!-- Friends List -->
          <div class="box friends-box">
            <h2 class="subtitle">Friends List</h2>
            <ul>
              <li v-for="friend in friends" :key="friend.id">
                <div class="friend-card">
                  <p><strong>Username:</strong> {{ friend.username }}</p>
                  <p><strong>Email:</strong> {{ friend.email }}</p>
                  <p><strong>First Name:</strong> {{ friend.firstName }}</p>
                  <p><strong>Last Name:</strong> {{ friend.lastName }}</p>
                  <!-- Add more friend information as needed -->
                  <button @click="removeFriend(friend)">Remove Friend</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getSession } from '@/model/session';
  import { getFriendsByUser, type User} from '@/model/users';
  
  const session = getSession();
  const user = session.user as User;
  
  const friends = getFriendsByUser(user);
  
  const removeFriend = (friend: User) => {
    // Implement logic to remove the friend
  };
  </script>
  
  <style scoped>
  /* Additional styles for friends-box */
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
  
  /* Additional styles for the friend cards */
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