import { reactive } from "vue";
import { type Router } from 'vue-router';
import { getUsers, type User} from '@/model/users';

const session = reactive({
  user: null as User | null,
})

export function getSession(){
  return session;
}

export function login(username: string, password: string, router: Router) {
  const user = getUsers().find(user => user.username === username && user.password === password);

  if (user) {
    session.user = user;
    router.push({ name: 'about' });
  } else {
    console.error('Invalid username or password.');
  }
}