import * as nunjucks from 'nunjucks';

export interface envtype {
    [key: string]: any;
}

export function getStrValue(value: string = "", env: envtype = {}) {
    if (value in env)
        return env[value];

    return nunjucks.renderString(value, env);
}

export {};