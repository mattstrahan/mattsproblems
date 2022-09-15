import { ProblemSpec, ProblemRepository } from './Problem'
import { ExerciseSpec, ExerciseRepository } from './Exercise'
import { Course, CourseRepository } from './Course';


export interface RepositorySpec {
    problems: { [key: string]: ProblemSpec };
    exercises: { [key: string]: ExerciseSpec };
    courses: { [key: string]: Course };
}

export interface RepositoryPartialSpec {
    problems?: { [key: string]: ProblemSpec };
    exercises?: { [key: string]: ExerciseSpec };
    courses?: { [key: string]: Course };
}

export interface Repository {
    problems: ProblemRepository;
    exercises: ExerciseRepository;
    courses: CourseRepository;
}
