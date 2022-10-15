import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { ParameterSpec } from "../../classes/Parameters";
import { VariableSpec } from "../../classes/Variables";
import { defaultenv, envtype, getStrValue } from "../../helpers/env";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setProblemQuestion, setProblemTitle } from "../../reducers/CreateReducer";
import Markdown from "../Markdown";
import MPPaper from "../MPPaper";
import { CreateAnswerComponent, CreateShowAnswerComponent } from "./CreateAnswer";
import { CreateParametersComponent } from "./CreateParameters";
import { CreateTextField } from "./CreateTextField";
import { CreateVariablesComponent } from "./CreateVariable";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

export function getCreateEnv(parameters?: { [key: string]: ParameterSpec }, variables?: { [key: string]: Partial<VariableSpec> }, stopParametersAt:string="", stopVariablesAt:string="") {
    // Go through and get the env from the variables. We only need to loop until we see our own varname.
    let env:envtype = {};
    Object.assign(env, defaultenv);
    if(parameters)
        for(let parameter in parameters) {
            // Have we hit our own variable? Then we don't need to continue building the env.
            if(parameter === stopParametersAt)
                break;
            if(parameters[parameter]?.default !== undefined)
                env[parameter] = parameters[parameter].default;
        }
    if(variables)
        for(let variable in variables) {
            // Have we hit our own variable? Then we don't need to continue building the env.
            if(variable === stopVariablesAt)
                break;
            
            if(variables[variable]?.example !== undefined)
                env[variable] = variables[variable].example;
        }
    
    return env;
}

interface CreateProblemRepeatComponentProps {
    probid: string;
    stageindex: number;
}

export function CreateProblemRepeatComponent({ probid, stageindex }: CreateProblemRepeatComponentProps) {    
    const problemtitle = useAppSelector(state => state.create.problems[probid].title); // Get the main exercise simply to see if it's there

    return (
        <Box paddingY={3} >
        <MPPaper>
            <Typography paragraph variant="h4">{problemtitle ? problemtitle : "Repeated problem"}</Typography>
            <CreateParametersComponent stageindex={stageindex} probid={probid} showSet />
        </MPPaper>
        </Box>
    )
}

interface CreateProblemTitleComponentProps {
    probid: string;
}

export function CreateProblemTitleComponent({probid} : CreateProblemTitleComponentProps) {
    const title = useAppSelector(state => state.create?.problems?.[probid]?.title); // Get the main exercise simply to see if it's there
    const [editTitle, setEditTitle] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (
            <Box paddingY={2}>
                {editTitle
                ? <div><TextField label="Title" value={title ? title : ""} onChange={(e) => dispatch(setProblemTitle({probid:probid, title:e.target.value}))} /> <IconButton onClick={() => setEditTitle(false)}><DoneIcon /></IconButton></div>
                : <Typography variant="h3">{title} <IconButton onClick={() => setEditTitle(true)}><EditIcon /></IconButton></Typography> 
                }
                
            </Box>
        )
}

interface CreateProblemComponentProps {
    probid: string;
    stageindex: number;
}

export function CreateProblemComponent({ probid, stageindex }: CreateProblemComponentProps) {
    const problem = useAppSelector(state => state.create.problems[probid]); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();

    if(!problem)
        return <div>Problem not {probid} found.</div>
    
    const env = getCreateEnv(problem.parameters, problem.variables);

    return (
        <Box paddingY={3} >
        <MPPaper>
            <CreateProblemTitleComponent probid={probid} />
            <CreateParametersComponent stageindex={stageindex} showDefault showSet probid={probid} />
            <CreateVariablesComponent probid={probid} />
            <Grid container spacing={4}>
                <Grid xs={12} sm={6}>
                    <Typography paragraph variant="h6">Problem statement</Typography>
                    <CreateTextField nunjucks multiline label="" initial={problem.question} handleChange={(e:string) => dispatch(setProblemQuestion({probid:probid, text:e}))} env={env} />
                    <CreateAnswerComponent env={env} probid={probid} />
                </Grid>
                <Grid xs={12} sm={6}>
                    <Paper>
                        <Box padding={3}>
                        <Typography paragraph variant="h6">Example</Typography>
                        <Markdown>{problem.question ? getStrValue(problem.question, env) : ""}</Markdown>
                        <CreateShowAnswerComponent answer={problem.answer} env={env} />
                        <Button disabled>Submit answer</Button> <Button disabled>Skip</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </MPPaper>
        </Box>
    )
}