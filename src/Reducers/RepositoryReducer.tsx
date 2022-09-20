import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepositorySpec } from '../classes/Repository'
import { Problem, ProblemRepository, ProblemSpec } from '../classes/Problem'
import { Exercise, ExerciseSpec } from '../classes/Exercise'
import { envtype } from '../helpers/env';
import { AnswerKeyFull } from '../components/Answers';
import repository from '../specs/repository';


export type repositoryStateType = {
    repository: RepositorySpec;
    myproblems: { [key: string]: ProblemSpec };
    myexercises: { [key: string]: ExerciseSpec };
    exercises: { [key: string]: Exercise };
    currentExercise: string;
    error?: string;
}

const initialRepositoryState: repositoryStateType = {
    "repository": repository,
    "myproblems": {},
    "myexercises": {},
    "exercises": {},
    "currentExercise": ""
}

/*
export const fetchInitial = createAsyncThunk('repository/fetchRepository', async () => {
    const files = await Promise.all(initialYAML.map((file) => {
        const response = fetch(file, {
            headers: {
                'Content-Type': 'application/x-yaml',
                'Accept': 'application/x-yaml'
            }
        })
            .then((response) => response.text())
            .then((yamlstring) => yaml.load(yamlstring));
        return response;
    }));
    return files;
})*/


const repositorySlice = createSlice({
    name: 'repository',
    initialState: initialRepositoryState,
    reducers: {
        createNewExercise: (state, action: PayloadAction<{exerciseid: string, parameters?: envtype}>) => {
            const exerciseid = action.payload.exerciseid;
            const parameters = action.payload.parameters;
            const exercisespec = new ExerciseSpec(state.repository.exercises[exerciseid]);
            const problemrepository = new ProblemRepository(state.repository.problems)
            if (!exercisespec.getExercise)
                return;
            const exercise = exercisespec.getExercise(problemrepository, exerciseid, parameters);

            state.currentExercise = (parseInt(Object.keys(state.exercises)[Object.keys(state.exercises).length - 1]) + 1).toString();
            if(!state.currentExercise || state.currentExercise === "NaN") {
                state.currentExercise = "0";
            }
            console.log("Creating new exercise " + state.currentExercise + " with parameters " + JSON.stringify(parameters));
            state.exercises[state.currentExercise] = exercise;
        },
        setCurrentExercise: (state, action: PayloadAction<string>) => {
            state.currentExercise = action.payload;
        },
        answerIsCorrect: (state, action: PayloadAction<AnswerKeyFull>) => {
            const ak = action.payload;
            console.log("GETTING PAYLOAD ", JSON.stringify(action.payload))
            if (state.exercises[ak.exercise].stages[ak.stage].type === "text")
                return;
            const problem = state.exercises[ak.exercise].stages[ak.stage] as Problem;
            problem.isCorrect = true;
        },
        nextProblem: (state, action: PayloadAction<AnswerKeyFull>) => {
            const ak = action.payload;
            state.exercises[ak.exercise].currentProblem = state.exercises[ak.exercise].currentProblem + 1;
        }
    }
/*    extraReducers(builder) {
        builder
            .addCase(fetchInitial.pending, (state, action) => {
                state.initialrequeststatus = 'loading'
            })
            .addCase(fetchInitial.fulfilled, (state, action) => {
                state.initialrequeststatus = 'succeeded'
                // Add any fetched posts to the array
                const rsl = action.payload as RepositoryPartialSpec[];
                for (let rs of rsl) {
                    if(rs['problems'])
                        state.repository.problems = {...state.repository.problems, ...rs['problems']};
                    if(rs['exercises'])
                        state.repository.exercises = { ...state.repository.exercises, ...rs['exercises'] };
                    if (rs['courses'])
                        state.repository.courses = { ...state.repository.courses, ...rs['courses'] };
                }
            })
            .addCase(fetchInitial.rejected, (state, action) => {
                state.initialrequeststatus = 'failed'
                state.error = action.error.message
            })
    }*/
})

export const {
    createNewExercise,
    setCurrentExercise,
    answerIsCorrect,
    nextProblem
} = repositorySlice.actions;
export default repositorySlice.reducer;