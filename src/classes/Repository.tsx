import { ProblemSpec } from './Problem'
import { ExerciseSpec } from './Exercise'
import { Course } from './Course';
import { Topic } from './Topics';


export interface RepositorySpec {
    problems: { [key: string]: Partial<ProblemSpec> };
    exercises: { [key: string]: Partial<ExerciseSpec> };
    courses: { [key: string]: Course };
    topics: { [key: string]: Topic };
}