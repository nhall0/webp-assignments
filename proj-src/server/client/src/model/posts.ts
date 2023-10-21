import posts from '@/data/posts.json';

export interface Post {
    id:string;
    owner: string;
    name: string;
    workout: string;
    date: string;
}

export function getPostById(id:string){
    return getPosts().find(post => post.id === id);
}

export function getPosts(){
    return Object.entries(posts).map(([id, postData]) => ({ id, ...postData }));
}

export function getPostsByUser(user:string){
    return getPosts().filter(post => post.owner === user);
}

export function getPostsByWorkout(workout:string){
    return getPosts().filter(post => post.workout === workout);
}