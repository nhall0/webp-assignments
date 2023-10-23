<script lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useLogin } from '@/model/session';
const { login, logout } = useLogin()


export default {
  setup() {
    return {
      activeTab,
      loginUser,
      loginPassword,
      signupName,
      signupEmail,
      signupPassword,
      changeTab,
      login,
      signup
    }
  }
}

var activeTab = ref("login");
var loginUser = ref("");
var loginPassword = ref("");
var signupName = ref("");
var signupEmail = ref("");
var signupPassword = ref("");

function changeTab(tab: string) {
  activeTab.value = tab;
}

function signup() {
  console.log("Signup");
}

</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title has-text-centered title-text">FitnessHero</h1>
          <div class="tabs is-fullwidth">
            <ul>
              <li :class="{ 'is-active': activeTab === 'login' }" class="tab-button" @click="changeTab('login')">
                <a>Login</a>
              </li>
              <li :class="{ 'is-active': activeTab === 'signup' }" class="tab-button" @click="changeTab('signup')">
                <a>Sign Up</a>
              </li>
            </ul>
          </div>
          <div v-if="activeTab === 'login'" class="form-container">
            <h1 class="title has-text-centered">Login</h1>
            <form>
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Enter your username" v-model="loginUser">
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="Enter your password" v-model="loginPassword">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <RouterLink to='/' class="button is-primary is-fullwidth"
                    @click.prevent="login(loginUser, loginPassword)">Login</RouterLink>
                </div>
              </div>
            </form>
          </div>
          <div v-else id="signupForm" class="form-container">
            <h1 class="title has-text-centered">Sign Up</h1>
            <form>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Enter your name" v-model="signupName">
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" placeholder="Enter your email" v-model="signupEmail">
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="Enter your password" v-model="signupPassword">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-success is-fullwidth" @click.prevent="signup">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  margin-top: 50px;
}

.tab-button {
  cursor: pointer;
}

.title-text {
  font-family: 'Roboto', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 50px;
}</style>
