import TextField, { TextFieldProps } from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { envtype, getStrValue } from "../../helpers/env";


interface CreateTextFieldProps {
    initial?: string;
    handleChange: Function;
    env?: envtype;
    nunjucks?: Boolean;
    errorcheck?: Function;
}

export function CreateTextField({ initial, handleChange, nunjucks, env, errorcheck, ...textfieldprops }: CreateTextFieldProps & TextFieldProps) {
    const [textfieldcur, setTextFieldCur] = React.useState<string>(initial ? initial : "");
    const [textfielderror, setTextFieldError] = React.useState<string>("");
    // This is a component that extends the Textfield component to allow for error checking in the case
    // of a bad nunjucks string or if the errorcheck function gives the bad answer.

    function onTexFieldChange(e: string) {
        try {
            setTextFieldCur(e);
            let value = "";
            if(nunjucks)
                value = getStrValue(e, env);
            else
                value = e;
            if(errorcheck !== undefined)
                errorcheck(value);
            setTextFieldError("");
            handleChange(e);
        } catch(e) {
            if (typeof e === "string") {
                setTextFieldError(e);
            } else if (e instanceof Error) {
                setTextFieldError(e.message);
            }
        }
    }

    return (
        <div>
            <Tooltip title={textfielderror} arrow>
                <TextField {...textfieldprops} value={textfieldcur} onChange={(e) => onTexFieldChange(e.target.value)} sx={{width: "100%"}} error={textfielderror !== ""} /> 
            </Tooltip>
        </div>
    )
}