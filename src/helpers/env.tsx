import * as nunjucks from 'nunjucks';

/*
This page defines the environment that is passed into Nunjucks. It also has helper functions for nunjucks.
*/

export function pm(value: number) {
    // Return "+" if and only if the provided value is negative
    if(value < 0)
        return ""
    else
        return "+"
}

export const defaultenv = {
    pm: pm,
    round: Math.round,
    floor: Math.floor,
    abs: Math.abs
}

export interface envtype {
    [key: string]: any;
}

export function getStrValue(value: string = "", env: envtype = {}) {
    if (value in env)
        return env[value];

    return nunjucks.renderString(value, env);
}

export {};