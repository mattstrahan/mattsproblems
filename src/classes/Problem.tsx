import * as nunjucks from 'nunjucks';
import { defaultenv, envtype, getStrValue } from '../helpers/env';
import { Answer, AnswerSpec, buildFillinsAnswer, buildMultipleChoiceAnswer, buildNumberAnswer, buildTextAnswer, FillinsAnswerSpec, MultipleChoiceAnswerSpec, NumberAnswerSpec, TextAnswerSpec } from './Answers';
import { getParameters, ParameterSpec } from './Parameters';
import { VariableLetterSpec, VariableNumberSpec, VariableSpec } from './Variables';
import { v4 as uuidv4 } from 'uuid';


export interface PartSpec {
     question: string;
     figurestore?: {[key:string]:string};
     answer: Partial<AnswerSpec>;
}

export interface ProblemSpec {
    title: string;
    description: string;
    additionalparts: Partial<PartSpec>[];
    question: string;
    figurestore?: {[key:string]:string};
    answer: Partial<AnswerSpec>;
    parameters: { [key: string]: ParameterSpec };
    variables: { [key: string]: Partial<VariableSpec> };
}

export interface JSGFigureStore {
    logic: string;
}

export interface Part { question: string; answer: Answer, jsgFigureStore?: {[key:string]:JSGFigureStore} };

export interface Problem {
    type: "problem";
    parts: Part[];
    questionnumber: number;
    isFinished: boolean;
}

export class ProblemSpec implements ProblemSpec {
    constructor(spec: Partial<ProblemSpec>) {
        this.title = spec.title ? spec.title : "";
        this.description = spec.description ? spec.description : "";
        this.question = spec.question ? spec.question : "";
        this.answer = spec.answer ? spec.answer : { type: "text", text: "" };
        this.additionalparts = spec.additionalparts ? spec.additionalparts : [];
        this.variables = {};
        this.parameters = spec.parameters ? spec.parameters : {};
        for (let variable in spec["variables"]) {
            if (spec["variables"][variable]["type"] === "number") {
                this.variables[variable] = new VariableNumberSpec(spec["variables"][variable] as Partial<VariableNumberSpec>);
            }
            if (spec["variables"][variable]["type"] === "letter") {
                this.variables[variable] = new VariableLetterSpec(spec["variables"][variable] as Partial<VariableLetterSpec>);
            }
        }
    }

    getVariable(variableid: string, env: envtype = {}) {
        // Get a valid variable given the environment.
        // Valid other variables that can be referred to should be stored in env. Eg. {"x":3}
        let variable;
        if (this.variables[variableid]["type"] === "number") {
            variable = new VariableNumberSpec(this.variables[variableid] as Partial<VariableNumberSpec>);
        }
        else {
            variable = new VariableLetterSpec(this.variables[variableid] as Partial<VariableLetterSpec>);
        }
        return variable.getValue(env);
    }

    getProblem(parameters: { [key: string]: string | number } = {}, questionnumber: number = 0) : Problem {

        let env: envtype = defaultenv;
        if(this.parameters)
            env = {...env, ...getParameters(this.parameters, parameters)};
        let parts : Part[] = [];
        let question: string = "";
        let answer: Answer = { type: "text", text: "", isCorrect: false };

        // Get the variables
        if (this.variables)
            for (let variableid in this.variables)
                if (this.getVariable)
                    env[variableid] = this.getVariable(variableid, env);

        // Allow the generation of the jsgFigureStore
        let jsgFigureStore:{[key:string]:JSGFigureStore} = {};
        function setJSXGraphFigure(jessiecode?:string) {
            if(!jessiecode)
                return "";
            
            const uuid = uuidv4();
            jsgFigureStore[uuid] = {logic:jessiecode};
            return `![${uuid}](jsxgraph_figurestore)`
    
        }
        const questionenv:envtype = Object.assign({}, env);
        questionenv["JSXGraph"] = setJSXGraphFigure;
        question = this.question ? getStrValue(this.question, questionenv) : "";
        

        if (this.answer)
            if(this.answer.type === "number")
                answer = buildNumberAnswer(this.answer as NumberAnswerSpec, env);
            else if (this.answer.type === "fillins")
                answer = buildFillinsAnswer(this.answer as FillinsAnswerSpec, env);
            else if (this.answer.type === "multiplechoice")
                answer = buildMultipleChoiceAnswer(this.answer as MultipleChoiceAnswerSpec, env);
            else
                answer = buildTextAnswer(this.answer as TextAnswerSpec, env);
        
        parts.push({question:question, answer:answer, jsgFigureStore:jsgFigureStore})

        if (this.additionalparts) {
            for(let part of this.additionalparts) {
                let newpart: Part = { question: "", answer: { type: "text", text: "", isCorrect: false }};
                if (part.question)
                    newpart.question = nunjucks.renderString(part.question, env);
                if (part.answer)
                    if (part.answer.type === "number")
                        newpart.answer = buildNumberAnswer(part.answer as NumberAnswerSpec, env);
                    else if (part.answer.type === "fillins")
                        newpart.answer = buildFillinsAnswer(part.answer as FillinsAnswerSpec, env);
                    else if (part.answer.type === "multiplechoice")
                        newpart.answer = buildMultipleChoiceAnswer(part.answer as MultipleChoiceAnswerSpec, env);
                    else
                        newpart.answer = buildTextAnswer(part.answer as TextAnswerSpec, env);
                parts.push(newpart);
            }
        }

        return { type: "problem", "parts": parts, questionnumber: questionnumber, isFinished: false };
    }
}

export interface ProblemRepository {
    problems: { [key: string]: Partial<ProblemSpec> };
}

export class ProblemRepository implements ProblemRepository {
    constructor(problemrepository: { [key: string]: Partial<ProblemSpec> }) {
        this.problems = problemrepository;
    }

    getProblem(probid: string, parameters: { [key: string]: string | number } = {}, questionnumber: number = 0) {
        if (probid in this.problems) {
            let problem = new ProblemSpec(this.problems[probid]);
            return problem.getProblem(parameters, questionnumber);
        }
    }

    toString() {
        let a = "";
        for (let probid in this.problems) {
            const gp = this.problems[probid].getProblem;
            if(gp)
                a += JSON.stringify(gp());
        }

        return a;
    }
}