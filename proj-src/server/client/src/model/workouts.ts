import { reactive } from "vue";
import { type User} from "./session" 
import exerciseData from "../data/test_db_values.json"

const session = reactive({
    user: null as User | null,
  })
  
export interface Workout {
    name: string;
    exercises: number[];
}

export interface Exercise {
    "name": string;
    "description": string;
    "muscleGroup": string;
    "equipment": string;
}

export function getExercises(){
    return exerciseData.exercises.map( x => x as Exercise) as Exercise[];
}

export function getExerciseByInt(id: number){
    return getExercises()[id];
}