import { envtype, getStrValue } from '../Helpers/env';
import { getParameters, ParameterSpec, processParameters } from './Parameters';
import { Problem, ProblemRepository } from './Problem'


export interface TextStage {
    type: "text" | "finish";
    heading?: string;
    text: string;

}

export type Stage = TextStage | Problem;

type StageSpec = TextStageSpec | ProblemStageSpec;

interface TextStageSpec {
    type: "text" | "finish";
    heading?: string;
    text: string;
}

class TextStageSpec implements TextStageSpec {
    constructor(spec: TextStageSpec) {
        this.type = spec["type"];
        this.heading = spec["heading"];
        this.text = spec["text"];
    }

    getStage(problemrepository: ProblemRepository, parameters?: envtype, questionnumber: number = 0): Stage | undefined {
        return {
            type: this.type,
            heading: getStrValue(this.heading, parameters),
            text: getStrValue(this.text, parameters)
        };
    }
}

interface ProblemStageSpec {
    type: "problem";
    probid: string;
    parameters?: { [key: string]: string | number };
}

class ProblemStageSpec {
    constructor(spec: ProblemStageSpec) {
        this.probid = ("probid" in spec ? spec["probid"] : "");
        this.parameters = ("parameters" in spec ? spec["parameters"] : {});
    }

    getStage(problemrepository: ProblemRepository, parameters?: envtype, questionnumber:number = 0): Stage | undefined {

        console.log(this.probid);
        var np = processParameters(this.parameters, parameters)
        
        let problem = problemrepository.getProblem(this.probid, np, questionnumber);
        console.log(problem);
        if (problem) return problem;
        return undefined;
    }
}

export interface ExerciseSpec {
    title?: string;
    description?: string;
    parameters?: { [key: string]: ParameterSpec };
    stages: Array<StageSpec>;
    finish: TextStageSpec;
}

export interface Exercise {
    exerciseSpecId: string;
    title?: string;
    description?: string;
    stages: Array<Stage>;
    currentProblem: number;
    showAllProblems?: boolean;
}

export class ExerciseSpec implements ExerciseSpec {
    constructor(spec: ExerciseSpec) {
        this.title = ("title" in spec ? spec["title"] : "");
        this.description = ("description" in spec ? spec["description"] : "");
        this.stages = [];
        this.parameters = ("parameters" in spec ? spec["parameters"] : {});
        if ("stages" in spec) {
            // Sort the stages into text and problem stages
            for (let stage of spec["stages"]) {
                if (!("type" in stage)) {
                    console.log("No type in stage %s", JSON.stringify(stage))
                    continue;
                } else if (stage["type"] === "text")
                    this.stages.push(new TextStageSpec(stage as TextStageSpec));
                else if (stage["type"] === "problem")
                    this.stages.push(new ProblemStageSpec(stage as ProblemStageSpec));
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
            const newstage = stage.getStage(problemrepository, parameters, questionnumber);
            if (newstage && newstage.type === "problem")
                questionnumber += 1;
            if(newstage)
                stages.push(newstage);
        }
        return {
            "exerciseSpecId": exerciseSpecId,
            "title": getStrValue(this.title, parameters),
            "description": getStrValue(this.description, parameters),
            "stages": stages,
            "currentProblem": 0
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
            return this.exercises[exerciseSpecId].getExercise(problemrepository, exerciseSpecId, parameters);
        }
        else return undefined
    }
}