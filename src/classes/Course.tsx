import { envtype } from "../helpers/env";

export interface CourseExerciseSpec {
    exerciseid: string;
    parameters?: envtype;
}

export interface Course {
    title?: string;
    description?: string;
    exercises?: CourseExerciseSpec[];
    topics?: { [key: string]: CourseExerciseSpec[] }
}

export interface CourseRepository {
    courses: { [key: string]: Course };
}
