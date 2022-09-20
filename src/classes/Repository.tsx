import { ProblemSpec } from './Problem'
import { ExerciseSpec } from './Exercise'
import { Course } from './Course';
import { Topic } from './Topics';


export interface RepositorySpec {
    problems: { [key: string]: ProblemSpec };
    exercises: { [key: string]: ExerciseSpec };
    courses: { [key: string]: Course };
    topics: { [key: string]: Topic };
}

export interface RepositoryPartialSpec {
    problems?: { [key: string]: ProblemSpec };
    exercises?: { [key: string]: ExerciseSpec };
    courses?: { [key: string]: Course };
}
