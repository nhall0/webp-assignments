import { reactive } from "vue";
import { type Router } from 'vue-router';
import userData from "../assets/test_db_values.json"

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
}

export function getSession(){
  return session;
}

export function login(username: string, password: string, router: Router) {
  const user = Object.values(userData.users).find(
    (user) => user.username === username && user.password === password
  ) as User;

  if (user) {
    session.user = user;
    router.push({ name: 'about' });
  } else {
    console.error('Invalid username or password.');
  }
}