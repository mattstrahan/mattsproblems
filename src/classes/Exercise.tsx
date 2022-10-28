import { envtype, getStrValue } from '../helpers/env';
import { getParameters, ParameterSpec, processParameters } from './Parameters';
import { JSGFigureStore, JSGFigureStoreAttributes, Problem, ProblemRepository } from './Problem'
import { v4 as uuidv4 } from 'uuid';


export interface TextStage {
    type: "text" | "finish";
    heading?: string;
    text: string;
    jsgFigureStore?: {[key:string]:JSGFigureStore}
}

export type Stage = TextStage | Problem;

type StageSpec = TextStageSpec | ProblemStageSpec;

interface TextStageSpec {
    type: "text" | "finish";
    heading?: string;
    text: string;
    parameters?: { [key: string]: string | number };
}

class TextStageSpec {
    constructor(spec: Partial<TextStageSpec>) {
        this.type = spec.type === "finish" ? "finish" : "text";
        this.heading = spec.heading ? spec.heading : "";
        this.text = spec.text ? spec.text : "";
    }

    getStage?(problemrepository: ProblemRepository, parameters?: envtype, questionnumber: number = 0): Stage | undefined {
        // Allow the generation of the jsgFigureStore
        let jsgFigureStore:{[key:string]:JSGFigureStore} = {};
        function setJSXGraphFigure(logic:string, attributes?:JSGFigureStoreAttributes) {
            const uuid = uuidv4();
            jsgFigureStore[uuid] = {logic:logic, attributes:attributes};
            return `![${uuid}](jsxgraph_figurestore)`
        }
        const env:envtype = parameters !== undefined ? parameters : {};
        env["JSXGraph"] = setJSXGraphFigure;
        const text = getStrValue(this.text, env)
        return {
            type: this.type,
            heading: getStrValue(this.heading, parameters),
            text: text,
            jsgFigureStore: jsgFigureStore
        };
    }
}

export interface ProblemStageSpec {
    type: "problem";
    probid: string;
    parameters?: { [key: string]: string | number };
    repeats?: number | string;
}

export class ProblemStageSpec {
    constructor(spec: Partial<ProblemStageSpec>) {
        this.probid = spec.probid ? spec.probid : "";
        this.parameters = spec.parameters ? spec.parameters : {};
        this.repeats = spec.repeats ? spec.repeats : 1;
    }

    getStage?(problemrepository: ProblemRepository, parameters?: envtype, questionnumber:number = 0): Stage | undefined {

        console.log(this.probid);
        var np = processParameters(this.parameters, parameters)
        
        let problem = problemrepository.getProblem(this.probid, np, questionnumber);
        console.log(problem);
        if (problem) return problem;
        return undefined;
    }
}

export interface ExerciseSpec {
    title: string;
    description?: string;
    parameters: { [key: string]: ParameterSpec };
    stages: StageSpec[];
    finish: {text:string};
    topic?: string;
}

export interface Exercise {
    exerciseSpecId: string;
    title: string;
    description: string;
    stages: Stage[];
    currentProblem: number;
    showAllProblems: boolean;
}

export class ExerciseSpec implements ExerciseSpec {
    constructor(spec: Partial<ExerciseSpec>) {
        this.title = spec.title ? spec.title : "";
        this.description = spec.description ? spec.description : "";
        this.stages = [];
        this.parameters = spec.parameters ? spec.parameters : {};
        if (spec.stages) {
            // Sort the stages into text and problem stages
            for (let stage of spec.stages) {
                if (!("type" in stage)) {
                    console.log("No type in stage %s", JSON.stringify(stage))
                    continue;
                } else if (stage["type"] === "text")
                    this.stages.push(new TextStageSpec(stage as Partial<TextStageSpec>));
                else if (stage["type"] === "problem")
                    this.stages.push(new ProblemStageSpec(stage as Partial<ProblemStageSpec>));
                else
                    console.log("Unrecognised type %s", stage["type"]);
            }
        } else
            console.log("Empty exercise %s", this.title);
        if ("finish" in spec) {
                this.stages.push(new TextStageSpec({...spec.finish, type: "finish"} as TextStageSpec));
        } else {
            this.stages.push(new TextStageSpec({ text: "Finished!", type: "finish" } as TextStageSpec));
        }
    }

    getExercise(problemrepository: ProblemRepository, exerciseSpecId: string = "", parameters: envtype = {}): Exercise {
        if (this.parameters)
            parameters = getParameters(this.parameters, parameters);
        let stages = [];
        let questionnumber = 1;
        for (let stage of this.stages) {
            if (stage.getStage) {
                if ("probid" in stage) {
                    let repeats : number = 1;
                    if(stage.repeats) {
                        if(typeof stage.repeats === "string")
                            repeats = parseInt(getStrValue(stage.repeats, parameters));
                        else
                            repeats = stage.repeats;
                        if(repeats > 50) // Put an upper limit on this
                            repeats = 50;
                    }
                    for(let i = 0; i < repeats; i++) {
                        const newstage = stage.getStage(problemrepository, parameters, questionnumber);
                        if(newstage)
                            stages.push(newstage);
                        questionnumber += 1;
                    }
                } else {
                    const newstage = stage.getStage(problemrepository, parameters, questionnumber);
                    if(newstage)
                        stages.push(newstage);
                }
            }
        }
        return {
            exerciseSpecId: exerciseSpecId,
            title: getStrValue(this.title, parameters),
            description: getStrValue(this.description, parameters),
            stages: stages,
            currentProblem: 0,
            showAllProblems: false
        };
    }
}

export interface ExerciseRepository {
    exercises: { [key: string]: ExerciseSpec };
}

export class ExerciseRepository {
    constructor() {
        this.exercises = {};
    }

    addExercise(exerciseid: string, exercise: ExerciseSpec) {
        this.exercises[exerciseid] = new ExerciseSpec(exercise);
    }

    addExercises(exercises: { [key: string]: ExerciseSpec }) {
        for (let exercise in exercises) {
            this.exercises[exercise] = new ExerciseSpec(exercises[exercise]);
        }
    }

    getExercise(exerciseSpecId: string, problemrepository: ProblemRepository, parameters: { [key: string]: string | number } = {}): Exercise | undefined {
        if (exerciseSpecId in this.exercises) {
            console.log("Getting exercise %s", exerciseSpecId);
            const ge = this.exercises[exerciseSpecId].getExercise;
            if(ge)
                return ge(problemrepository, exerciseSpecId, parameters);
            return undefined;
        }
        else return undefined
    }
}