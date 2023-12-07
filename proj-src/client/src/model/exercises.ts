import {api} from "./session";

export interface Exercise {
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string;
  id: number;
}

export async function getExerciseById(index: number) : Promise<Exercise> {
  const exercise = api("exercises/" + index);
  return exercise;
}

export async function getExerciseIndexByName(name: string) : Promise<Exercise> {
  const exercise = api("exercises/name/" + name);
  return exercise;
}

export async function getAllExercises(): Promise<Exercise[]> {
  const exercises = await api("exercises");
  return exercises;
}

export async function getExercises(subList: number[] = []): Promise<Exercise[]> {
    const exercises = await api("exercises");

    if(subList.length === 0) {
      return []
    }

    const returnExercises: Exercise[] = [];

    for(const index of subList) {
      returnExercises.push(exercises[index]);
    }

    return returnExercises; 
}