import { envtype, getStrValue } from "../helpers/env";


export interface VariableNumberSpec {
    type: "number";
    min: number | string;
    max: number | string;
    step: number | string;
    example?: number;
}

export class VariableNumberSpec {
    constructor(spec:Partial<VariableNumberSpec>) {
        this.type = "number";
        this.min = spec.min !== undefined ? spec.min : 0;
        this.max = spec.max !== undefined ? spec.max : 10;
        this.step = spec.step !== undefined ? spec.step : 0;
    }

    get_parameters(env:envtype = {}) {
        let min: number = 0;
        let max: number = 1000;
        let step: number = 1;

        // See if they're strings, if so get their values
        if (typeof this.min === 'string')
            min = parseInt(getStrValue(this.min, env)) as number;
        else
            min = this.min;
        if (typeof this.max === 'string')
            max = parseInt(getStrValue(this.max, env)) as number;
        else
            max = this.max;
        if (typeof this.step === 'string')
            step = parseInt(getStrValue(this.step, env)) as number;
        else
            step = this.step;

        // Error checking, make sure min < max
        if (min > max) {
            let a = min;
            min = max;
            max = a;
        }

        // Error checking, make sure step is positive
        if (step < 0)
            step = -step;

        // Error checking, make sure step is at least 1, otherwise it will have repeat numbers
        if (step < 1)
            step = 1;
        
        return [min, max, step];
    }

    includes(value:number|string, env = {}):boolean {
        if(!this.get_parameters)
            return false;

        if(typeof value === "string")
            return false;
        
        let [min, max, step] = this.get_parameters(env);

        if(value >= min && value <= max && (value - min) % step === 0) {
            return true;
        }


        return false;
    }

    getValue(env:envtype = {}):number {
        console.log(`Get variable value with min: env ${JSON.stringify(env)}`);
        // Get a number variable.
        // spec should be {min: number, max: number, step: number}
        // min default is 0, max default is 1000, step default is 1
        if(!this.get_parameters) {
            return 0;
        }
        
        let [min, max, step] = this.get_parameters(env);

        if(isNaN(min))
            min = 0

        console.log(`min: ${min}, max: ${max}, step: ${step}`);

        if (min === max)
            return min; // There's no other value that it could be

        // Get the number of possible steps away from min
        var nsteps = Math.floor((max - min) / step) + 1;


        // This will happen if steps is bigger than the difference between min and max
        // If this is the case min is the only valid answer
        if (nsteps === 0)
            return min;

        // Get the random value
        const retval = min + (Math.floor(Math.random() * nsteps)*step);
        return retval;
    }
}

export interface VariableLetterSpec {
    type: "letter";
    exclude: string;
    example?: string;
}

export class VariableLetterSpec {
    constructor(spec : Partial<VariableLetterSpec>) {
        this.type="letter";
        this.exclude=spec.exclude !== undefined ? spec.exclude : "";
    }

    includes(value:number|string, env = {}):boolean {
        const exclude = getStrValue(this.exclude, env);
        const encludelist = exclude.split('');
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
        let candidates = [];

        for(let letter of alphabet)
            if (!encludelist.includes(letter))
                candidates.push(letter);

        if(candidates.length === 0) // Don't change the example if there's no new example to change to
            return true;
        if(typeof value === "number")
            return false;
        if(candidates.includes(value))
            return true;
        return false;
    }

    getValue(env:envtype = {}):string {
        // This returns a random letter, excluding what is in exclude.
        // It is useful for random algebra parameters, with exclude being used for previous parameters.

        const exclude = getStrValue(this.exclude, env);
        const encludelist = exclude.split('');
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
        let candidates = [];

        for(let letter of alphabet)
            if (!encludelist.includes(letter))
                candidates.push(letter);
        
        if(candidates.length === 0)
            return "x";
        
        // Get the random value
        return candidates[Math.floor(Math.random() * candidates.length)];
    }
}

export type VariableSpec = VariableLetterSpec | VariableNumberSpec

export function getVariableFromType(variable:Partial<VariableSpec>) {
    if (variable["type"] === "letter") {
        return new VariableLetterSpec(variable as Partial<VariableLetterSpec>);
    }
    return new VariableNumberSpec(variable as Partial<VariableNumberSpec>);
}

export function combinePartialVariableValues(variablea:Partial<VariableSpec>, variableb:Partial<VariableSpec>) {
    if (variablea["type"] === "letter" && variableb["type"] === "letter")
        return {...variablea as Partial<VariableLetterSpec>, ...variableb as Partial<VariableLetterSpec>};
    if (variablea["type"] === "number" && variableb["type"] === "number")
        return {...variablea as Partial<VariableLetterSpec>, ...variableb as Partial<VariableLetterSpec>};
    return variablea;
}
