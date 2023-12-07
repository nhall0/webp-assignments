import {api} from "./session";

export interface Workout {
  _id: string;
  name: string;
  exercises: number[];
  sets: number;
  reps: number;
  privacy: number;
}

export async function getWorkoutById(id: string) : Promise<Workout>{
  if(!id) return Promise.resolve({} as Workout);
  const workout = await api("workouts/" + id);
  if(workout == null) return Promise.resolve({"name":"Workout deleted."} as Workout);
  return await api("workouts/" + id);
}

export async  function removeWorkout(id: string) {
  await api("workouts/" + id, null, "DELETE");
}

export async function postNewWorkout(workout: Workout)  {
  await api("workouts", workout);
}

export async function updateWorkout(workout: Workout) {
  await api("workouts/" + workout._id, workout, "PATCH");
}

export async function getWorkouts() : Promise<Workout[]>{
  return await api("workouts");
}

export async function getWorkoutsFromUser(userId: string) : Promise<Workout[]>{
  return await api("workouts/user/" + userId);
}