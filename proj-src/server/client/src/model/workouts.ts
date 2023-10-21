import workouts from "@/data/workouts.json";
import { getUserById } from "@/model/users";

export interface Workout {
  id: string;
  name: string;
  exercises: number[];
  sets: number;
  reps: number;
  privacy: number;
}

export function getWorkoutById(id: string) {
  return getWorkouts().find(workout => workout.id === id);
}

export function getWorkouts() {
  return Object.entries(workouts).map(([id, workoutData]) => ({ id, ...workoutData })) as Workout[];
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
     if(returnWorkout != null){
        returnWorkouts.push(returnWorkout);
     }
  }

  return returnWorkouts;
}