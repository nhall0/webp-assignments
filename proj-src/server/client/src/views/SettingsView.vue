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
        <h1 class="title has-text-success">Settings</h1>
        
        <div class="box settings-box">
          <h2 class="subtitle">Profile Settings</h2>
          <form>
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left">
                <input class="input" type="text" v-model="profile.name" placeholder="Enter your name">
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input class="input" type="email" v-model="profile.email" placeholder="Enter your email">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success" type="submit">
                <span class="icon is-small">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        <div class="box settings-box">
          <h2 class="subtitle">Notification Settings</h2>
          <div class="field">
            <label class="checkbox">
              <input id="emailNotifications" type="checkbox" v-model="notificationSettings.email">
              Receive Email Notifications
            </label>
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

.settings-box {
  border: 2px solid #00D1B2;
  border-radius: 10px;
  margin: 20px 0;
  padding: 20px;
}

.icon.is-small {
  margin-right: 5px;
}
</style>
