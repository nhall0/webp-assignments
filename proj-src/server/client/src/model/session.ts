import { reactive } from "vue";
import { type Router } from 'vue-router';
import userData from "../data/test_db_values.json"
import {type Workout } from "./workouts";

const session = reactive({
  user: null as User | null,
})

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  workouts?: Workout[];
}

export function getSession(){
  return session;
}

export function getUsers(){
  return userData.users;
}

export function login(username: string, password: string, router: Router) {
  const user = Object.values(getUsers()).find(
    (user) => user.username === username && user.password === password
  ) as User;

  if (user) {
    session.user = user;
    router.push({ name: 'about' });
  } else {
    console.error('Invalid username or password.');
  }
}