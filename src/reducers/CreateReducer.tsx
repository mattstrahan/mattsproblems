import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnswerSpec } from '../classes/Answers';
import { ExerciseSpec, ProblemStageSpec } from '../classes/Exercise'
import { ParameterSpec } from '../classes/Parameters';
import { ProblemSpec } from '../classes/Problem';
import { combinePartialVariableValues, VariableLetterSpec, VariableNumberSpec, VariableSpec } from '../classes/Variables';


interface CreateProblemAdditionalProps {
    showParameters?: boolean;
    showParts?: boolean;
    showRepeats?: boolean;
}

export type exerciseCreatorStateType = {
    exercise: Partial<ExerciseSpec> | undefined;
    problems: { [key: string]: Partial<ProblemSpec> & CreateProblemAdditionalProps };
    textstages: { [key: string]: string };
}

const initialExerciseCreatorState: exerciseCreatorStateType = {
    "exercise": undefined,
    problems: {},
    textstages: {}
}

function getNewKeyValue (curKeys: { [key: string]: any }) {
    const keys = Object.keys(curKeys);
    var newID = keys.length.toString();
    if(newID === "0"){ // Noone likes a Problem 0, sorry computer people
        newID = "1";
    }
    while(keys.includes(newID))
        newID = (parseInt(newID) + 1).toString(); // This is necessary in the rare case that someone's uploaded a problem with custom IDs.
    return newID;
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
            if(state.exercise) {
                var newTextStageID = getNewKeyValue(state.textstages);
                state.textstages[newTextStageID] = action.payload;
                state?.exercise?.stages?.push({type: "text", text: "", textstageid:newTextStageID});
            }
        },
        addProblem: (state, action:PayloadAction<Partial<ProblemSpec>>) => {
            const newProblemID = getNewKeyValue(state.problems);
            state.problems[newProblemID] = action.payload;
            if(state.exercise)
                state?.exercise?.stages?.push({type: "problem", probid:newProblemID});
        },
        moveStage: (state, action:PayloadAction<{stageindex:number, direction:"up"|"down"}>) => {
            const { stageindex, direction } = action.payload;
            if(!state?.exercise?.stages)
                return;
            if(stageindex >= state.exercise.stages.length || stageindex < 0)
                return;
            if(direction === "up") {
                if(stageindex === 0)
                    return;
                [state.exercise.stages[stageindex], state.exercise.stages[stageindex - 1]] = [state.exercise.stages[stageindex - 1], state.exercise.stages[stageindex]]
            } else {
                if(stageindex === state.exercise.stages.length)
                    return;
                [state.exercise.stages[stageindex], state.exercise.stages[stageindex + 1]] = [state.exercise.stages[stageindex + 1], state.exercise.stages[stageindex]]
            }
        },
        removeStage: (state, action:PayloadAction<{stageindex:number}>) => {
            const stageindex = action.payload.stageindex;
            if(!state?.exercise?.stages)
                return;
            if(stageindex >= state.exercise.stages.length || stageindex < 0)
                return;
            state.exercise.stages.splice(stageindex)
        },
        addNewProblem: (state, action:PayloadAction<string>) => {
            const newProblemID = getNewKeyValue(state.problems);
            state.problems[newProblemID] = {
                title: `Problem ${newProblemID}`,
                description: "",
                additionalparts: [],
                question: "",
                answer: {type:"number", label: "Answer:", value:"0", precision:"0", decimals: "0"},
                parameters: {},
                variables: {}
            }
            if(state.exercise)
                state?.exercise?.stages?.push({type: "problem", probid:newProblemID});
        },
        addRepeatProblem: (state, action:PayloadAction<string>) => {
            const keys = Object.keys(state.problems);
            const problemID = action.payload;
            if(!keys.includes(problemID)){ // Noone likes a Problem 0, sorry computer people
                console.error(`Existing problem ${problemID} not found.`)
                return;
            }
            if(state.exercise)
                state?.exercise?.stages?.push({type: "problem", probid:problemID});
            else {
                console.error("Pushing repeat problem in create without an exercise being created.")
            }
        },
        addNewPart: (state, action:PayloadAction<{probid: string}>) => {
            const probid = action.payload.probid;
            if(state.problems[probid]) {
                const problem = state.problems[probid];
                if(problem.additionalparts === undefined)
                    problem.additionalparts = [{question: "",
                        answer: {type:"number", label: "Answer:", value:"0", precision:"0", decimals: "0"}}]
                else
                    problem.additionalparts.push({question: "",
                    answer: {type:"number", label: "Answer:", value:"0", precision:"0", decimals: "0"}});
            }

        },
        setTextStageText: (state, action:PayloadAction<{id: number, textStageID: string | undefined, text: string}>) => {
            const { id, textStageID, text } = action.payload;
            if(textStageID === undefined) {
                if(state?.exercise?.stages && id in state.exercise.stages && state.exercise.stages[id].type === "text") {
                    var newTextStageID = getNewKeyValue(state.textstages);
                    state.textstages[newTextStageID] = text;
                    state.exercise.stages[id] = {type: "text", text: "", textstageid: newTextStageID};
                }
            } else {
                state.textstages[textStageID] = text;
            }
            
        },
        setProblemStage: (state, action:PayloadAction<{stageindex: number, problemstage: ProblemStageSpec}>) => {
            const { stageindex, problemstage } = action.payload;
            if(state?.exercise?.stages && stageindex in state.exercise.stages && state.exercise.stages[stageindex].type === "problem") {
                state.exercise.stages[stageindex] = problemstage;
            }
        },
        setProblemTitle: (state, action:PayloadAction<{probid: string, title: string}>) => {
            const { probid, title } = action.payload;
            if(state.problems[probid]) {
                state.problems[probid].title = title;
            }
        },
        setProblemQuestion: (state, action:PayloadAction<{probid: string, text: string, partindex?: number}>) => {
            const {probid, partindex, text} = action.payload;
            if(state.problems[probid]) {
                if(partindex === undefined) {
                    state.problems[probid].question = text;
                }
                else {
                    const problem = state.problems[probid];
                    if(problem.additionalparts !== undefined && problem.additionalparts[partindex] !== undefined) {
                        problem.additionalparts[partindex].question = text;
                    }
                }
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
        setAnswer: (state, action:PayloadAction<{probid: string,partindex?: number, answer: Partial<AnswerSpec>}>) => {
            const probid = action.payload.probid;
            let newanswer = action.payload.answer;
            const partindex = action.payload.partindex;
            if(state.problems[probid]) {
                if(partindex === undefined)
                    state.problems[probid].answer = newanswer
                else {
                    const problem = state.problems[probid];
                    if(problem.additionalparts !== undefined && problem.additionalparts[partindex] !== undefined)
                        problem.additionalparts[partindex].answer = newanswer;
                }
            }
        },
        setShowParameters: (state, action:PayloadAction<{probid: string, setting: boolean}>) => {
            const probid = action.payload.probid;
            const setting = action.payload.setting;
            if(state.problems[probid])
                state.problems[probid].showParameters = setting;
            else
                console.error(`Attempting to set showParameters for problem that doesn't exist. probid: ${probid}`);
        },
        setShowParts: (state, action:PayloadAction<{probid: string, setting: boolean}>) => {
            const probid = action.payload.probid;
            const setting = action.payload.setting;
            if(state.problems[probid])
                state.problems[probid].showParts = setting;
            else
                console.error(`Attempting to set showParts for problem that doesn't exist. probid: ${probid}`);
        },
        setShowRepeats: (state, action:PayloadAction<{probid: string, setting: boolean}>) => {
            const probid = action.payload.probid;
            const setting = action.payload.setting;
            if(state.problems[probid])
                state.problems[probid].showRepeats = setting;
            else
                console.error(`Attempting to set showRepeats for problem that doesn't exist. probid: ${probid}`);
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
    addProblem,
    moveStage,
    removeStage,
    addNewProblem,
    addRepeatProblem,
    addNewPart,
    setTextStageText,
    setProblemTitle,
    setProblemQuestion,
    setProblemStage,
    addNewNumberVariable,
    addNewLetterVariable,
    addNewParameter,
    removeVariable,
    removeParameter,
    setExerciseProblemParameter,
    setVariableExample,
    setVariable,
    setParameter,
    setAnswer,
    setShowParameters,
    setShowParts,
    setShowRepeats
} = exerciseCreatorSlice.actions;
export default exerciseCreatorSlice.reducer;