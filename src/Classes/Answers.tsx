import * as nunjucks from 'nunjucks';
import { envtype } from '../helpers/env';


export interface NumberAnswer {
    type: "number";
    label?: string;
    value: number;
    precision?: number;
    isCorrect: boolean;
}

export interface TextAnswer {
    type: "text";
    label?: string;
    text: string;
    isCorrect: boolean;
}

export interface Fillin {
    value: number;
    precision: number;
}

export interface FillinsAnswer {
    type: "fillins";
    label?: string;
    answerfillins: string;
    answertext: string;
    answerworksheet: string;
    fillins: Fillin[];
    isCorrect: boolean;
}

export type Answer = TextAnswer | NumberAnswer | FillinsAnswer;

export interface NumberAnswerSpec {
    type: "number";
    label?: string;
    value: number | string;
    precision?: number | string;
    decimals?: number | string;
}

export interface TextAnswerSpec {
    type: "text";
    label?: string;
    text: string;
}

export interface FillinsAnswerSpec {
    type: "fillins";
    label?: string;
    value: string;
}

export type AnswerSpec = NumberAnswerSpec | TextAnswerSpec | FillinsAnswerSpec;

export function buildTextAnswer(textAnswerSpec : TextAnswerSpec, env : envtype) : TextAnswer {
    console.log("Building text answer %s with env %s", JSON.stringify(textAnswerSpec), JSON.stringify(env));
    const text = nunjucks.renderString(textAnswerSpec.text, env);
    const label = typeof textAnswerSpec.label === "string"
        ? nunjucks.renderString(textAnswerSpec.label, env)
        : undefined;
    return { type: "text", label: label, text: text, isCorrect: false };
}

export function buildNumberAnswer(numberAnswerSpec: NumberAnswerSpec, env: envtype): NumberAnswer {
    const value = typeof numberAnswerSpec.value === "string"
        ? parseFloat(nunjucks.renderString(numberAnswerSpec.value, env))
        : numberAnswerSpec.value;
    const precision = typeof numberAnswerSpec.precision === "string"
        ? parseFloat(nunjucks.renderString(numberAnswerSpec.precision, env))
        : numberAnswerSpec.precision;
    const label = typeof numberAnswerSpec.label === "string"
        ? nunjucks.renderString(numberAnswerSpec.label, env)
        : undefined;
    console.log("Building number answer %s with env %s got ", JSON.stringify(numberAnswerSpec), JSON.stringify(env), value);
    return { type: "number", label: label, value: value, precision: precision, isCorrect: false };
}

interface GetFillins {
    fillins: Fillin[];
}

class GetFillins {
    constructor() {
        this.fillins = [];
    }

    getfillin(value:number, precision:number = 0) {
        if(precision < 0) {
            console.warn("Precision for fillin set as less than 0, changing to 0.");
            precision = 0;
        }
        const curfillin = this.fillins.length;
        this.fillins.push({ value: value, precision: precision});
        return `\\htmlId{fillin_${curfillin.toString()}}{}`;
    }
}

export function buildFillinsAnswer(fillinAnswerSpec: FillinsAnswerSpec, env: envtype): FillinsAnswer {
    console.log("Building fillin answer %s with env %s", JSON.stringify(fillinAnswerSpec), JSON.stringify(env));
    let getfillins = new GetFillins();
    const answerfillins = nunjucks.renderString(fillinAnswerSpec.value, { ...env, fillin: (value: number, precision?: number) => { return getfillins.getfillin(value, precision)}});
    console.log("ANSWER FILLINS: " + answerfillins)
    const answertext = nunjucks.renderString(fillinAnswerSpec.value, { ...env, fillin: (value: number, precision?: number) => { return value.toString() } });
    const answerworksheet = nunjucks.renderString(fillinAnswerSpec.value, { ...env, fillin: (value: number, precision?: number) => { return "\\_\\_\\_" } });
    const label = typeof fillinAnswerSpec.label === "string"
        ? nunjucks.renderString(fillinAnswerSpec.label, env)
        : undefined;
    return {
        type: "fillins",
        label: label,
        answerfillins: answerfillins,
        answertext: answertext,
        answerworksheet: answerworksheet,
        fillins: getfillins.fillins,
        isCorrect: false
    };
}
