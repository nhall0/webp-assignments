import userData from "@/data/users.json";

export interface User {
    id:string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role:number;
    workouts: string[];
    friends: string[];
    goals: string[];
}

export function getUserById(id:string){
    return getUsers().find(user => user.id === id);
}

export function getFriendsByUser(user:User){
    return getUsers().filter(u => user.friends.includes(u.id));
}

export function getUsers(){
    return Object.entries(userData).map(([id, userData]) => ({ id, ...userData }));
}