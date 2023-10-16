<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';

const session = getSession();

const profile = ref({
  name: session.user?.firstName + ' ' + session.user?.lastName,
  email: session.user?.email
});

const notificationSettings = ref({
  email: true
});

</script>

<template>
  <div class="settings-page">
    <section class="section">
      <div class="container">
        <h1 class="title">Settings</h1>
        
        <div class="box">
          <h2 class="subtitle">Profile Settings</h2>
          <form>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" v-model="profile.name" placeholder="Enter your name">
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" v-model="profile.email" placeholder="Enter your email">
              </div>
            </div>
            <div class="field">
              <button class="button is-primary" type="submit">Save Changes</button>
            </div>
          </form>
        </div>

        <div class="box">
          <h2 class="subtitle">Notification Settings</h2>
          <div class="field">
            <input id="emailNotifications" type="checkbox" v-model="notificationSettings.email">
            <label for="emailNotifications">Receive Email Notifications</label>
          </div>
 
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>

.settings-page {
  padding: 20px;
}
</style>
