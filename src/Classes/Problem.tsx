import * as nunjucks from 'nunjucks';
import { envtype } from '../Helpers/env';
import { Answer, AnswerSpec, buildFillinsAnswer, buildNumberAnswer, buildTextAnswer, FillinsAnswerSpec, NumberAnswerSpec, TextAnswerSpec } from './Answers';
import { getParameters, ParameterSpec } from './Parameters';
import { VariableLetterSpec, VariableNumberSpec, VariableSpec } from './Variables';


export interface PartSpec {
     question: string;
     answer: AnswerSpec;
}

export interface ProblemSpec {
    title?: string;
    description?: string;
    parts?: PartSpec[];
    question?: string;
    answer?: AnswerSpec;
    parameters?: { [key: string]: ParameterSpec };
    variables?: { [key: string]: VariableSpec };
    getVariable(variableid: string, env: envtype): number;
    getProblem(): Problem;
}

export interface Part { question?: string; answer: Answer; };

export interface Problem {
    type: "problem";
    parts: Part[];
    questionnumber: number;
    question: string;
    answer: Answer;
    isCorrect: boolean;
}

export class ProblemSpec implements ProblemSpec {
    constructor(spec: ProblemSpec) {
        this.title = "title" in spec ? spec["title"] : "";
        this.description = "description" in spec ? spec["description"] : "";
        this.question = "question" in spec ? spec["question"] : "";
        this.answer = "answer" in spec ? spec["answer"] : { type: "text", text: "" };
        this.parts = spec["parts"];
        this.variables = {};
        this.parameters = "parameters" in spec ? spec["parameters"] : {};
        for (let variable in spec["variables"]) {
            if (spec["variables"][variable]["type"] === "number") {
                this.variables[variable] = new VariableNumberSpec(spec["variables"][variable]);
            }
            if (spec["variables"][variable]["type"] === "letter") {
                this.variables[variable] = new VariableLetterSpec(spec["variables"][variable]);
            }
        }
    }

    getVariable(variableid: string, env: envtype = {}) {
        // Get a valid variable given the environment.
        // Valid other variables that can be referred to should be stored in env. Eg. {"x":3}
        if (this.variables && variableid in this.variables) {
            return this.variables[variableid].getValue(env);
        }
    }

    getProblem(parameters: { [key: string]: string | number } = {}, questionnumber: number = 0) : Problem {

        let env: envtype = {};
        if(this.parameters)
            env = getParameters(this.parameters, parameters);
        let parts : Part[] = [];
        let question: string = "";
        let answer: Answer = { type: "text", text: "", isCorrect: false };

        // Get the variables
        if (this.variables)
            for (let variableid in this.variables)
                env[variableid] = this.getVariable(variableid, env);

        if (this.parts) {
            for(let part of this.parts) {
                let newpart: Part = { question: "", answer: { type: "text", text: "", isCorrect: false }};
                if (part.question)
                    newpart.question = nunjucks.renderString(part.question, env);
                if (part.answer)
                    if (part.answer.type === "number")
                        newpart.answer = buildNumberAnswer(part.answer as NumberAnswerSpec, env);
                    else if (part.answer.type === "fillins")
                        newpart.answer = buildFillinsAnswer(part.answer as FillinsAnswerSpec, env);
                    else
                        newpart.answer = buildTextAnswer(part.answer as TextAnswerSpec, env);
                parts.push(newpart);
            }
        }

        if (this.question)
            question = nunjucks.renderString(this.question, env);

        if (this.answer)
            if(this.answer.type === "number")
                answer = buildNumberAnswer(this.answer as NumberAnswerSpec, env);
            else if (this.answer.type === "fillins")
                answer = buildFillinsAnswer(this.answer as FillinsAnswerSpec, env);
            else
                answer = buildTextAnswer(this.answer as TextAnswerSpec, env);

        return { type: "problem", "parts": parts, questionnumber: questionnumber, "question": question, "answer": answer, isCorrect: false };
    }
}

export interface ProblemRepository {
    problems: { [key: string]: ProblemSpec };
}

export class ProblemRepository implements ProblemRepository {
    constructor(problemrepository: { [key: string]: ProblemSpec }) {
        this.problems = problemrepository;
    }

    addProblem(probid: string, problem: ProblemSpec) {
        this.problems[probid] = new ProblemSpec(problem);
    }

    addProblems(problems: { [key: string]: ProblemSpec }) {
        for (let probid in problems) {
            this.problems[probid] = new ProblemSpec(problems[probid]);
        }
    }

    getProblem(probid: string, parameters: { [key: string]: string | number } = {}, questionnumber: number = 0) {
        if (probid in this.problems) {
            let problem = new ProblemSpec(this.problems[probid]);
            return problem.getProblem(parameters, questionnumber);
        }
    }

    toString() {
        let a = "";
        for (let probid in this.problems)
            a += JSON.stringify(this.problems[probid].getProblem());

        return a;
    }
}