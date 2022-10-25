import * as nunjucks from 'nunjucks';

/*
This page defines the environment that is passed into Nunjucks. It also has helper functions for nunjucks.
*/

function gcd(a:number, b:number):number {
    // Greatest common divisor of a and b
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a:number, b:number):number {
    // Lowest common multiple of a and b
    return (a * b) / gcd(a, b);   
}

function pip(value: number) {
    // Return "+" if and only if the provided value is negative
    if(value < 0)
        return ""
    else
        return "+"
}

function showDecimals(value: number, dp: number) {
    return value.toFixed(dp)
}

export const defaultenv = {
    pip: pip,
    round: Math.round,
    floor: Math.floor,
    ceil: Math.ceil,
    abs: Math.abs,
    lcm: lcm,
    gcd: gcd,
    e: Math.E,
    pi: Math.PI,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    ln: Math.log,
    max: Math.max,
    min: Math.min,
    random: Math.random,
    showDecimals: showDecimals
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