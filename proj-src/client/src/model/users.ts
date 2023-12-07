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

export async function changePassword(user: User, password: string) {
    user.password = password;
    await api("users/password", user, "PATCH");
}

export async function getUserById(id: string) {
    return await api("users/" + id);
}

export async function getFriendsByUser() {
    return await api("users/friends");
}

export async function addFriend(friend: string) {
    return await api("users/friends/"+friend, null, "POST");
}

export async function removeFriend(friend: string) {
    return await api("users/friends/"+friend, null, "DELETE");
}

export async function deleteUser(id: string) {
    return await api("users/"+id, null, "DELETE");
}

export async function makeUser(username: string, email: string, password: string, firstName: string, lastName: string) {
    const user: User = {
        _id: "",
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: 0,
        friends: []
    }

    return await api("users/register", user, "POST");
}

export async function getUsers() {
    return await api("users");
  }