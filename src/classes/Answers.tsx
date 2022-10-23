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

export interface MultipleChoiceAnswer {
    type: "multiplechoice";
    label?: string;
    values: string[];
    answer: number;
    isCorrect: boolean;
}

export type Answer = TextAnswer | NumberAnswer | FillinsAnswer | MultipleChoiceAnswer;

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

export interface MultipleChoiceAnswerSpec {
    type: "multiplechoice";
    label?: string;
    values: string[];
    answer: number;
    doNotRandomise?: boolean;
}

export function combinePartialAnswerValues(answera:Partial<AnswerSpec>, answerb:Partial<AnswerSpec>) {
    if (answera["type"] === "number" && answerb["type"] === "number")
        return {...answera as Partial<NumberAnswerSpec>, ...answerb as Partial<NumberAnswerSpec>};
    if (answera["type"] === "text" && answerb["type"] === "text")
        return {...answera as Partial<TextAnswerSpec>, ...answerb as Partial<TextAnswerSpec>};
    if (answera["type"] === "fillins" && answerb["type"] === "fillins")
        return {...answera as Partial<FillinsAnswerSpec>, ...answerb as Partial<FillinsAnswerSpec>};
    if (answera["type"] === "multiplechoice" && answerb["type"] === "multiplechoice")
        return {...answera as Partial<MultipleChoiceAnswerSpec>, ...answerb as Partial<MultipleChoiceAnswerSpec>};
    return answera;
}


export type AnswerSpec = NumberAnswerSpec | TextAnswerSpec | FillinsAnswerSpec | MultipleChoiceAnswerSpec;

export function buildTextAnswer(textAnswerSpec : TextAnswerSpec, env : envtype) : TextAnswer {
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
    let getfillins = new GetFillins();
    const answerfillins = nunjucks.renderString(fillinAnswerSpec.value, { ...env, fillin: (value: number, precision?: number) => { return getfillins.getfillin(value, precision)}});
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

// Needed for multiple choice
function shuffleArray<T>(array:Array<T>) : Array<T> {
    // Loop through the array backwards
    for(let ci = array.length - 1; ci >= 0; ci--) {
        // Swap the element with a random one before it.
        let ri = Math.floor(Math.random() * (ci+1));
        [array[ci], array[ri]] = [array[ri], array[ci]];
    }
    return array;
}

export function buildMultipleChoiceAnswer(multipleChoiceAnswerSpec: MultipleChoiceAnswerSpec, env: envtype): MultipleChoiceAnswer {
    const label = typeof multipleChoiceAnswerSpec.label === "string"
        ? nunjucks.renderString(multipleChoiceAnswerSpec.label, env)
        : undefined;
    
    const doNotRandomise = multipleChoiceAnswerSpec.doNotRandomise;

    const randomArray = shuffleArray<number>([...Array(multipleChoiceAnswerSpec.values.length).keys()]);
    console.log(`randomArray: ${randomArray}`)
    console.log(`answer: ${multipleChoiceAnswerSpec.answer}`)
    const answer = multipleChoiceAnswerSpec.doNotRandomise ? multipleChoiceAnswerSpec.answer : randomArray.findIndex(object => object === multipleChoiceAnswerSpec.answer);
    let values = multipleChoiceAnswerSpec.values;
    if(!doNotRandomise) {
        let newValues:string[] = []
        for(let i = 0; i < randomArray.length; i++) {
            newValues.push(nunjucks.renderString(values[randomArray[i]], env));
        }
        values = newValues;
    } else {
        let newValues:string[] = []
        for(let i = 0; i < randomArray.length; i++) {
            newValues.push(nunjucks.renderString(values[i], env));
        }
        values = newValues;
        
    }
    console.log(`new values: ${values}`)
    console.log(`new answer: ${answer}`)
    return { type: "multiplechoice", label: label, values: values, answer: answer, isCorrect: false };
}