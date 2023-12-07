import {api} from "./session";

export interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
    friends: string[];
}

export async function postNewUser(user: User) {
    await api("users", {
        method: "POST",
        body: JSON.stringify(user)
    });
}

export async function getUserById(id: string) {
    return await api("users/" + id);
}

export async function getFriendsByUser() {
    return await api("users/friends/");
}

export async function addFriend(friend: User) {
    return await api("users/add-friend", {
        method: "POST",
        body: JSON.stringify({"friendId":friend})
    });
}

export async function removeFriend(friend: User) {
    return await api("users/remove-friend", {
        method: "POST",
        body: JSON.stringify({"friendId":friend})
    });
}

export async function makeUser(username: string, email: string, password: string) {
    const user: User = {
        _id: "",
        username: username,
        password: password,
        email: email,
        firstName: "",
        lastName: "",
        role: 0,
        friends: []
    }

    return await api("users", {
        method: "POST",
        body: JSON.stringify(user)});
}

export async function getUsers() {
    return await api("users");
  }