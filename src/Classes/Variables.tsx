import { getStrValue } from "../helpers/env";


export interface VariableNumberSpec {
    type: "number";
    min: number | string;
    max: number | string;
    step: number | string;
}

export class VariableNumberSpec {
    constructor(spec = {}) {
        Object.assign(this, spec);
    }

    getValue?(env = {}):number {
        // Get a number variable.
        // spec should be {min: number, max: number, step: number}
        // min default is 0, max default is 1000, step default is 1

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
        if (min === max)
            return min; // There's no other value that it could be
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

        // Get the number of possible steps away from min
        var nsteps = Math.floor((max - min) / step);

        // This will happen if steps is bigger than the difference between min and max
        // If this is the case min is the only valid answer
        if (nsteps === 0)
            return min;

        // Get the random value
        return min + (Math.floor(Math.random() * nsteps));
    }
}

export interface VariableLetterSpec {
    type: "letter";
    exclude: string;
}

export class VariableLetterSpec {
    constructor(spec = {}) {
        Object.assign(this, spec);
    }

    getValue?(env = {}):string {
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

        console.log("exclude: " + exclude);
        console.log("Candidates: " + candidates);
        
        // Get the random value
        return candidates[Math.floor(Math.random() * candidates.length)];
    }
}

export type VariableSpec = VariableLetterSpec | VariableNumberSpec