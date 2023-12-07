import {api} from "./session";

export interface Post {
    _id?: string;
    owner: string;
    name: string;
    workout: string;
    date: string;
}

export async function addPost(post: Post) {
    return await api("posts", post);
}

export async function getPostById(id: string) {
    return api("posts/" + id);
}

export async function getPosts() {
    return await api("posts");
}

export async function getPostsByDate(date: string, user?: string) {
    var filteredPosts = await getPosts()
    filteredPosts = filteredPosts.filter((post : Post) => post.date === date);

    const sortedPosts = filteredPosts.sort((a : Post, b : Post) => {
        const dateA = new Date(a.date).getTime() as number;
        const dateB = new Date(b.date).getTime() as number;
        return dateB - dateA;
    });

    if (user) {
        return sortedPosts.filter((post : Post) => post.owner === user);
    }

    return sortedPosts;
}

export async function getPostsByUsers(users: string[]) {
    var filteredPosts = await getPosts()
    
    filteredPosts = filteredPosts.filter((post : Post) => users.includes(post.owner));

    const sortedPosts = filteredPosts.sort((a : Post, b : Post) => {
        const dateA = new Date(a.date).getTime() as number;
        const dateB = new Date(b.date).getTime() as number;
        return dateB - dateA;
    });

    return sortedPosts;
}