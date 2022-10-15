import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { getVariableFromType, VariableLetterSpec, VariableNumberSpec, VariableSpec } from "../../classes/Variables";
import { envtype } from "../../helpers/env";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewLetterVariable, addNewNumberVariable, removeVariable, setVariable, setVariableExample } from "../../reducers/CreateReducer";
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import Filter1Icon from '@mui/icons-material/Filter1';
import AbcIcon from '@mui/icons-material/Abc';
import MPPaper from "../MPPaper";
import Grid from "@mui/material/Unstable_Grid2";
import { CreateTextField } from "./CreateTextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getCreateEnv } from "./CreateProblem";

export function checkNumber(value:string) {
    const valuenumber = parseInt(value);
    if(isNaN(valuenumber))
        throw new Error("Value does not end up as a number");
    return true;
}

interface CreateVariableLetterComponentProps {
    probid: string;
    varname: string;
}



function VariableExampleComponent({ probid, varname }: CreateVariableLetterComponentProps) {
    // Calculate and show the variable example component
    const parameters = useAppSelector(state => state.create.problems[probid].parameters);
    const variables = useAppSelector(state => state.create.problems[probid].variables);
    const dispatch = useAppDispatch();

    // Go through and get the env from the variables. We only need to loop until we see our own varname.
    const env:envtype = getCreateEnv(parameters, variables, "", varname);

    if(!variables) 
        return <div>Variables not initialised</div>
    if(!variables[varname])
        return <div>Variable not found</div>;
    
    const variable = getVariableFromType(variables[varname]);
    const example = variables[varname]?.example;

    if(example === undefined) {
        dispatch(setVariableExample({probid: probid, varname: varname, example:variable.getValue(env)}));
    }
    /*else if(!(variable.includes(example, env))) {
        dispatch(setVariableExample({probid: probid, varname: varname, example:variable.getValue(env)}));
    }*/


    return <Box padding={1}>
            Example: {variables[varname].example}
            <IconButton onClick={() => dispatch(setVariableExample({probid: probid, varname: varname, example:variable.getValue(env)}))}>
                <RefreshIcon />
            </IconButton>
        </Box>;
}


interface CreateVariableLetterComponentProps {
    probid: string;
    varname: string;

}


function CreateVariableLetterComponent({ probid, varname }: CreateVariableLetterComponentProps) {
    const variable = useAppSelector(state => state.create.problems?.[probid]?.variables?.[varname]);
    const dispatch = useAppDispatch();

    if(!variable)
        return <div>Variable not found</div>
    if(!(variable.type === "letter"))
        return <div>Variable not right type</div>
    const textvariable = variable as VariableLetterSpec;

    function onExcludeChange(newexclude: string) {        
        const newvariable:Partial<VariableLetterSpec> = {type: "letter", exclude: newexclude}
        dispatch(setVariable({probid:probid, varname:varname, variable:newvariable}));
    }

    return (
        <Grid container xs={12} spacing={1}>
                <Grid xs={12} sm={3}>
                <Box padding={1}>
                <Typography><IconButton onClick={() => dispatch(removeVariable({probid: probid, varname: varname}))} >
                        <DeleteIcon />
                    </IconButton>Name: {varname}</Typography>
                    </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                <TextField label="Exclude these letters" value={textvariable.exclude} onChange={(e) => onExcludeChange(e.target.value)} sx={{width: "100%"}} />
                </Grid>
                <Grid xs={12} sm={3}>
                <Box padding={1}>
                    <VariableExampleComponent probid={probid} varname={varname} />
                </Box>
                </Grid>
        </Grid>
    )
}

interface CreateVariableNumberComponentProps {
    probid: string;
    varname: string;

}

function CreateVariableNumberComponent({ probid, varname }: CreateVariableNumberComponentProps) {
    const variable = useAppSelector(state => state.create.problems?.[probid]?.variables?.[varname]);
    
    // Used for calculating the env
    const parameters = useAppSelector(state => state.create.problems[probid].parameters);
    const variables = useAppSelector(state => state.create.problems[probid].variables);

    const dispatch = useAppDispatch();


    // Go through and get the env from the variables. We only need to loop until we see our own varname.
    const env:envtype = getCreateEnv(parameters, variables, "", varname);

    if(!variable)
        return <div>Variable not found</div>
    if(!(variable.type === "number"))
        return <div>Variable not right type</div>
    const numbervariable = variable as VariableNumberSpec;

    function onValueChange(parameter: string, newvalue: string) {        
        const newvariable:Partial<VariableNumberSpec> = {type: "number", [parameter]: newvalue}
        dispatch(setVariable({probid:probid, varname:varname, variable:newvariable}));
    }

    return (
        <Grid container xs={12} spacing={1}>
                <Grid xs={12} sm={3}>
                <Box padding={1}>
                    
                    <Typography><IconButton onClick={() => dispatch(removeVariable({probid: probid, varname: varname}))} >
                        <DeleteIcon />
                    </IconButton> Name: {varname}</Typography></Box>
                </Grid>
                <Grid xs={12} sm={2}>
                <CreateTextField
                    label="Minimum value"
                    initial={numbervariable.min.toString()}
                    handleChange={(e:string) => onValueChange("min", e)}
                    env={env}
                    errorcheck={checkNumber} />
                </Grid>
                <Grid xs={12} sm={2}>
                <CreateTextField
                    label="Maximum value"
                    initial={numbervariable.max.toString()}
                    handleChange={(e:string) => onValueChange("max", e)}
                    env={env}
                    errorcheck={checkNumber} />
                </Grid>
                <Grid xs={12} sm={2}>
                <CreateTextField
                    label="Steps between values"
                    initial={numbervariable.step.toString()}
                    handleChange={(e:string) => onValueChange("step", e)}
                    env={env}
                    errorcheck={checkNumber} />
                </Grid>
                <Grid xs={12} sm={3}>
                <Box padding={1}>
                    <VariableExampleComponent probid={probid} varname={varname} />
                    </Box>
                </Grid>
        </Grid>
    )
}


interface CreateVariablesExpandedComponentProps {
    probid: string;
}

export function CreateVariablesExpandedComponent({ probid }: CreateVariablesExpandedComponentProps) {
    const problem = useAppSelector(state => state.create.problems[probid]); // Get the main exercise simply to see if it's there
    const [newvarname, setNewVarName] = React.useState<string>("");
    const dispatch = useAppDispatch();

    return (
        <div>
            {problem.variables ? 
                Object.entries(problem.variables).map((entry, index) => {
                    const id = entry[0];
                    const variable = entry[1];
                    if(variable.type === "number")
                        return <CreateVariableNumberComponent key={index} probid={probid} varname={id} />
                    else if(variable.type === "letter")
                        return <CreateVariableLetterComponent key={index} probid={probid} varname={id} />
                    return <div></div>
                }
                )
                : <div></div>
            }

            <Grid container spacing={4}>
            <Grid xs={9} sm={4} >
            <TextField label="Add new variable" value={newvarname} onChange={(e) => setNewVarName(e.target.value)} sx={{width:"100%"}} />
            </Grid>
            <Grid xs >
            <Box padding={1}>

            <IconButton onClick={() => {dispatch(addNewNumberVariable({probid: probid, varname: newvarname}));setNewVarName("")}}><Filter1Icon /></IconButton>
            <IconButton onClick={() => {dispatch(addNewLetterVariable({probid: probid, varname: newvarname}));setNewVarName("")}}><AbcIcon /></IconButton>
            </Box>
            </Grid>
            </Grid>
        </div>
    )
}

interface CreateVariablesCompactComponentProps {
    probid: string;
}

export function CreateVariablesCompactComponent({ probid }: CreateVariablesCompactComponentProps) {
    const variables = useAppSelector(state => state.create.problems[probid].variables); // Get the main exercise simply to see if it's there

    return (
        <List>
            {variables !== undefined ? 
                Object.entries(variables).map((entry:[string, Partial<VariableSpec>], index) => {
                    const varname = entry[0];
                    const variable = entry[1];
                    if (variable.type === "number") {
                        const numbervar = variable as Partial<VariableNumberSpec>;
                        return (
                        <ListItem key={index}>
                            <ListItemIcon><Filter1Icon /></ListItemIcon>
                            <ListItemText>Name: {varname}, Min: {numbervar.min}, Max: {numbervar.max}, Step: {numbervar.step}, Example: {numbervar.example}</ListItemText>
                        </ListItem>
                        );
                    } else if (variable.type === "letter") {
                        const lettervar = variable as Partial<VariableLetterSpec>;
                        return (
                        <ListItem key={index}>
                            <ListItemIcon><AbcIcon /></ListItemIcon>
                            <ListItemText>Name: {varname}, Exclude: {lettervar.exclude}, Example: {lettervar.example}</ListItemText>
                        </ListItem>
                        );
                    }
                    return (<div></div>);
                }

                )
                : <div></div>
            }
        </List>
    )
}




interface CreateVariablesComponentProps {
    probid: string;
}

export function CreateVariablesComponent({ probid }: CreateVariablesComponentProps) {
    const [compact, setCompact] = React.useState(false);

    return (
        <Box paddingY={2}>
        <MPPaper>
            <Grid container spacing={1}>
                <Grid xs><Typography paragraph variant="h6">Variables</Typography></Grid>
                <Grid xs="auto"><IconButton onClick={() => setCompact(!compact)}>{compact ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton></Grid>
            </Grid>
            
        {compact ? <CreateVariablesCompactComponent probid={probid} /> : <CreateVariablesExpandedComponent probid={probid} />}
        </MPPaper>
        </Box>
    )
}
