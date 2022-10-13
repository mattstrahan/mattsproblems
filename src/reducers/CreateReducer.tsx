import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectFlags } from 'typescript';
import { AnswerSpec } from '../classes/Answers';
import { ExerciseSpec } from '../classes/Exercise'
import { ParameterSpec } from '../classes/Parameters';
import { ProblemSpec } from '../classes/Problem';
import { combinePartialVariableValues, VariableLetterSpec, VariableNumberSpec, VariableSpec } from '../classes/Variables';

export type exerciseCreatorStateType = {
    exercise: Partial<ExerciseSpec> | undefined;
    problems: { [key: string]: Partial<ProblemSpec> };
}

const initialExerciseCreatorState: exerciseCreatorStateType = {
    "exercise": undefined,
    problems: {}
}

const exerciseCreatorSlice = createSlice({
    name: 'exercisecreator',
    initialState: initialExerciseCreatorState,
    reducers: {
        createNewExercise: (state, action: PayloadAction<string>) => {
            state.exercise = {
                title: action.payload,
                description: "",
                topic: "",
                parameters: {},
                stages:[],
                finish: {text: ""}
            };
        },
        createNewExerciseFromExisting: (state, action: PayloadAction<{exercise:Partial<ExerciseSpec>, problemrepository:{ [key: string]: Partial<ProblemSpec> }}>) => {
            let newexercise:Partial<ExerciseSpec> = {}; // Copy the exercise in.
            Object.assign(newexercise, action.payload.exercise);
            state.exercise = newexercise;
            let problems:{ [key: string]: Partial<ProblemSpec> } = {};
            if(newexercise.stages !== undefined)
                for(let problem of newexercise.stages) {
                    if(problem.type === "problem" && problem.probid !== undefined) {
                        if(!(problem.probid in action.payload.problemrepository)) {
                            console.error(`Problem with probid ${problem.probid} not in supplied repository. Skipping.`);
                            continue;
                        }
                        problems[problem.probid] = structuredClone(action.payload.problemrepository[problem.probid]);
                    }
                }
            state.problems = problems;
        },
        setExerciseTitle: (state, action:PayloadAction<string>) => {
            if(state.exercise)
                state.exercise.title = action.payload;
        },
        setExerciseDescription: (state, action:PayloadAction<string>) => {
            if(state.exercise)
                state.exercise.description = action.payload;
        },
        setExerciseFinish: (state, action:PayloadAction<string>) => {
            if(state.exercise)
                state.exercise.finish = {text: action.payload};
        },
        addTextStage: (state, action:PayloadAction<string>) => {
            if(state.exercise)
                state?.exercise?.stages?.push({type: "text", text: ""});
        },
        addNewProblem: (state, action:PayloadAction<string>) => {
            const keys = Object.keys(state.problems);
            var newProblemID = keys.length.toString();
            while(keys.includes(newProblemID))
                newProblemID = (parseInt(newProblemID) + 1).toString(); // This is necessary in the rare case that someone's uploaded a problem with custom IDs.
            state.problems[newProblemID] = {
                title: "",
                description: "",
                parts: [],
                question: "",
                answer: {type:"number", label: "", value:"0", precision:"0", decimals: "0"},
                parameters: {},
                variables: {}
            }
            if(state.exercise)
                state?.exercise?.stages?.push({type: "problem", probid:newProblemID});
        },
        setTextStageLabel: (state, action:PayloadAction<{id: number, text: string}>) => {
            const id = action.payload.id;
            const text = action.payload.text;
            if(state?.exercise?.stages && id in state.exercise.stages && state.exercise.stages[id].type === "text") {
                state.exercise.stages[id] = {type: "text", text: text};
            }
        },
        setProblemTitle: (state, action:PayloadAction<{probid: string, title: string}>) => {
            const probid = action.payload.probid;
            if(state.problems[probid]) {
                state.problems[probid].title = action.payload.title;
            }
        },
        setProblemQuestion: (state, action:PayloadAction<{probid: string, text: string}>) => {
            const probid = action.payload.probid;
            if(state.problems[probid]) {
                state.problems[probid].question = action.payload.text;
            }
        },
        addNewNumberVariable: (state, action:PayloadAction<{probid: string, varname: string}>) => {
            const probid = action.payload.probid;
            const varname = action.payload.varname;
            const newvar:Partial<VariableNumberSpec> = {type:"number", min:0, max:10, step:1};
            if(probid in state?.problems) {
                const prob = state.problems[probid];
                if(prob.variables)
                    prob.variables[varname] = newvar;
            }
        },
        addNewLetterVariable: (state, action:PayloadAction<{probid: string, varname: string}>) => {
            const probid = action.payload.probid;
            const varname = action.payload.varname;
            const newvar:Partial<VariableLetterSpec> = {type:"letter", exclude:""};
            if(probid in state?.problems) {
                const prob = state.problems[probid];
                if(prob.variables)
                    prob.variables[varname] = newvar;
            }
        },
        addNewParameter: (state, action:PayloadAction<{probid: string, parname: string, type: "number" | "string"}>) => {
            const probid = action.payload.probid;
            const parname = action.payload.parname;
            const type = action.payload.type;
            const newpar:ParameterSpec = {type:type, default:""};
            console.log(`Adding parameter for problem ${probid}`);
            if(probid in state?.problems) {
                state.problems[probid] = {...state.problems[probid], parameters:{...state.problems[probid].parameters, [parname]:newpar}}
            } else {
                console.error(`Adding parameter: ${probid} not found!`)
            }
        },
        removeParameter: (state, action:PayloadAction<{probid: string, parname: string}>) => {
            const probid = action.payload.probid;
            const parname = action.payload.parname;
            delete state?.problems?.[probid]?.parameters?.[parname];
        },
        removeVariable: (state, action:PayloadAction<{probid: string, varname: string}>) => {
            const probid = action.payload.probid;
            const varname = action.payload.varname;
            delete state?.problems?.[probid]?.variables?.[varname];
        },
        setVariableExample: (state, action:PayloadAction<{probid: string, varname: string, example: string | number}>) => {
            const probid = action.payload.probid;
            const varname = action.payload.varname;
            const example = action.payload.example;
            if(probid in state?.problems) {
                const prob = state.problems[probid];
                if(prob.variables)
                    prob.variables[varname].example = example;
            }
        },
        setVariable: (state, action:PayloadAction<{probid: string, varname: string, variable: Partial<VariableSpec>}>) => {
            const probid = action.payload.probid;
            const varname = action.payload.varname;
            let newvariable = action.payload.variable;
            const oldvariables = state.problems[probid].variables;
            if(oldvariables !== undefined && varname in oldvariables) {
                newvariable = combinePartialVariableValues(oldvariables[varname], newvariable)
            }
            state.problems[probid] = {...state.problems[probid],
                variables: {...oldvariables, [varname]: newvariable}}
        },
        setParameter: (state, action:PayloadAction<{probid: string, parname: string, parameter: ParameterSpec}>) => {
            const probid = action.payload.probid;
            const parname = action.payload.parname;
            let newparameter = action.payload.parameter;
            const oldparameters = state.problems[probid].parameters;
            state.problems[probid] = {...state.problems[probid],
                parameters: {...oldparameters, [parname]: newparameter}}
        },
        setExerciseProblemParameter: (state, action:PayloadAction<{probid: string, parname: string, stageindex: number, value: string}>) => {
            const probid = action.payload.probid;
            const parname = action.payload.parname;
            const stageindex = action.payload.stageindex;
            let value:string|number = action.payload.value;
            const parameter = state?.problems?.[probid]?.parameters?.[parname];
            if(parameter === undefined)
                return;
            
            if(parameter.type === "number")
                value = parseInt(value);
            if(state?.exercise?.stages?.[stageindex] !== undefined)
                state.exercise.stages[stageindex] = {
                    ...state.exercise.stages[stageindex], parameters: {...state.exercise.stages[stageindex].parameters, [parname]:value}
                };
            
        },
        setAnswer: (state, action:PayloadAction<{probid: string, answer: Partial<AnswerSpec>}>) => {
            const probid = action.payload.probid;
            let newanswer = action.payload.answer;
            state.problems[probid].answer = newanswer
        }
    }
})

export const {
    createNewExercise,
    createNewExerciseFromExisting,
    setExerciseTitle,
    setExerciseDescription,
    setExerciseFinish,
    addTextStage,
    addNewProblem,
    setTextStageLabel,
    setProblemTitle,
    setProblemQuestion,
    addNewNumberVariable,
    addNewLetterVariable,
    addNewParameter,
    removeVariable,
    removeParameter,
    setExerciseProblemParameter,
    setVariableExample,
    setVariable,
    setParameter,
    setAnswer
} = exerciseCreatorSlice.actions;
export default exerciseCreatorSlice.reducer;