import workoutData from "@/data/workouts.json";
import { getUserById } from "@/model/users";
import { v4 as uuidv4 } from 'uuid';
import { addWorkout } from "@/model/users";

export interface Workout {
  id: string;
  name: string;
  exercises: number[];
  sets: number;
  reps: number;
  privacy: number;
}

export let workouts: { [key: string]: Workout } = workoutData as unknown as { [key: string]: Workout };

export function getWorkoutById(id: string) {
  return getWorkouts().find(workout => workout.id === id);
}

export function postNewWorkout(workout: Workout, userId: string) {
  if(workout.id == ''){
    const id = uuidv4();
    workout.id = id;
  }
  workouts[workout.id] = workout;
  addWorkout(userId, workout.id);
}

export function getWorkouts() {
  return Object.keys(workouts).map((key) => {
    const workout = workouts[key];
    workout.id = key;
    return workout;
  });
}

export function getWorkoutsFromUser(userId: string) {
  const user = getUserById(userId);
  if (!user) {
    return [];
  }

  const userWorkouts = user.workouts;
  var returnWorkouts: Workout[] = [];

  for (let i = 0; i < userWorkouts.length; i++) {
    var returnWorkout = getWorkoutById(userWorkouts[i])
    if (returnWorkout != null) {
      returnWorkouts.push(returnWorkout);
    }
  }

  return returnWorkouts;
}