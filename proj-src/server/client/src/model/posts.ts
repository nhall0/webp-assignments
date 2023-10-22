import posts from '@/data/posts.json';

export interface Post {
    id: string;
    owner: string;
    name: string;
    workout: string;
    date: string;
}

export function getPostById(id: string) {
    return getPosts().find(post => post.id === id);
}

export function getPosts() {
    return Object.entries(posts).map(([id, postData]) => ({ id, ...postData }));
}

export function getPostsByDate(date: string, user?: string) {
    const filteredPosts = getPosts().filter((post) => post.date === date);

    const sortedPosts = filteredPosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime() as number;
        const dateB = new Date(b.date).getTime() as number;
        return dateB - dateA;
    });

    if (user) {
        return sortedPosts.filter((post) => post.owner === user);
    }

    return sortedPosts;
}

export function getPostsByUsers(users: string[]) {
    // Filter posts by users
    const filteredPosts = getPosts().filter((post) => users.includes(post.owner));

    // Sort filtered posts by date (latest to oldest)
    const sortedPosts = filteredPosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime() as number;
        const dateB = new Date(b.date).getTime() as number;
        return dateB - dateA;
    });

    return sortedPosts;
}