import { envtype } from "../Helpers/env";

export interface CourseExerciseSpec {
    exerciseid: string;
    parameters?: envtype;
}

export interface Course {
    title?: string;
    description?: string;
    exercises: { [key: string]: CourseExerciseSpec };
}

export interface CourseRepository {
    courses: { [key: string]: Course };
}
