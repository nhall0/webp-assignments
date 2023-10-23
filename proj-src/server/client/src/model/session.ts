import { reactive } from "vue";
import { useRouter } from "vue-router"
import { type User, getUserByUsername} from "./users";

const session = reactive({
  user: null as User | null,
  redirectUrl: null as string | null,
})

export function getSession(){
  return session;
}

export function useLogin(){
  const router = useRouter();

  return {
    login(username: string, password: string): User | null {
      const user = getUserByUsername(username);
      if(user && user.password === password){
        session.user = user;
        router.push(session.redirectUrl || "/");
        return user;
      }
      return null;
    },
    logout(){
      session.user = null;
      router.push("/login");
    }
  }
}