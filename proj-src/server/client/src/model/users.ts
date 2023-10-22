import userData from "@/data/users.json";

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
    workouts: string[];
    friends: string[];
    goals: string[];
}

export let users: { [key: string]: User } = userData as unknown as { [key: string]: User };

export function postNewUser(user: User) {
    users[user.id] = user;
}

export function addGoal(userId: string, goalId: string) {
    const user = getUserById(userId);
  
    if (user === undefined) {
      return;
    }
  
    if (user.goals.indexOf(goalId) === -1) {
      user.goals.push(goalId);
    }
  
    users[userId].goals = user.goals;
}

export function addWorkout(userId: string, workoutId: string) {
    var user = getUserById(userId);

    if(user == undefined) {
        return;
    }

    if (user.goals.indexOf(workoutId) === -1) {
        user.workouts.push(workoutId);
    }    

    users[userId].workouts = user.workouts;
}

export function getUserById(id: string) {
    return getUsers().find(user => user.id === id);
}

export function getFriendsByUser(user: User) {
    return getUsers().filter(u => user.friends.includes(u.id));
}

export function getUsers() {
    return Object.keys(users).map((key) => {
      const user = users[key];
      user.id = key;
      return user;
    });
  }