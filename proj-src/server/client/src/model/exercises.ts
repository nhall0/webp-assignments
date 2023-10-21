import exercises from "@/data/exercises.json";

import { getWorkoutById } from "./workouts";

export interface Exercise {
    name: string;
    description: string;
    muscleGroup: string;
    equipment: string;
}

export function getExerciseById(index:number){
  const exercises = getExercises();
  return exercises[index];
}

export function getExercises(subList?: number[]): Exercise[] {
    const returnExercises: Exercise[] = [];
    
    if (subList) {
      subList.forEach(index => {
        const exercise = getExerciseById(index);
        if (exercise) {
          returnExercises.push(exercise);
        }
      });
    } else {
      returnExercises.push(...exercises); 
    }
  
    return returnExercises;
  }

export function getExercisesFromWorkout(workoutId: string){
    var workout = getWorkoutById(workoutId);
    if (workout === undefined) {
        return [];
    }
    return workout.exercises.map(index => getExerciseById(index));
}