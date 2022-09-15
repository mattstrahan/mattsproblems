import { envtype, getStrValue } from "../Helpers/env";

// Parameters can be strings or numbers. They have a mandatory default which is used when the parameter isn't explicitly supplied.
export interface ParameterSpec {
    type: "string" | "number";
    default: string | number;
}

export function getParameters(parameters: { [key: string]: ParameterSpec }, setParameters: envtype = {}) {
    // With the supplied parameter specs, set the appropriate parameters from what is given.
    // This fixes up types for supplied parameters and fills in defaults for parameters that are missing.
    // It will return a list of parameters suitable for an env.

    if(!setParameters)
        setParameters = {};
    let parameterList: { [key: string]: number | string } = {};
    for (let parameter in parameters) {
        if(parameter in setParameters) {
            if (parameters[parameter].type === "number") {
                if(typeof setParameters[parameter] === "number")
                    parameterList[parameter] = setParameters[parameter];
                else
                    parameterList[parameter] = parseFloat(setParameters[parameter] as string);
            } else if ((parameters[parameter].type === "string" && typeof setParameters[parameter] === "string")) {
                parameterList[parameter] = setParameters[parameter].toString();
            } else
                parameterList[parameter] = parameters[parameter].default;
        } else
            parameterList[parameter] = parameters[parameter].default;
    }
    return parameterList;
}

export function processParameters(parameters?: envtype, env: envtype = {}) {
    // Process each supplied parameter with the supplied environment using Nunjucks
    if (parameters)
        for (let key in parameters) {
            if (typeof (parameters[key]) === "string") {
                parameters[key] = getStrValue(parameters[key] as string, env);
            }
        }
    return parameters;
}