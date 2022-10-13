import { Box, Button, FormControl, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { VariableSpec } from "../../classes/Variables";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewProblem, addTextStage, setExerciseDescription, setExerciseFinish, setExerciseTitle,  setProblemQuestion, setTextStageLabel, setProblemTitle } from "../../reducers/CreateReducer";
import Markdown from "../Markdown";
import { defaultenv, envtype, getStrValue } from "../../helpers/env";
import { ParameterSpec } from "../../classes/Parameters";
import {  CreateVariablesComponent } from "./CreateVariable";
import { addExercise } from "../../reducers/RepositoryReducer";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MPPaper from "../MPPaper";
import { ExportYAML } from "../export/ExportYAML";
import { CreateParametersComponent } from "./CreateParameters";
import { CreateAnswerComponent, CreateShowAnswerComponent } from "./CreateAnswer";
import { CreateTextField } from "./CreateTextField";
import { CreateNewExerciseComponent } from "./CreateNewExercise";

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
            <Typography paragraph variant="h4">Problem{problemtitle ? " - " + problemtitle : ""}</Typography>
            <CreateParametersComponent stageindex={stageindex} probid={probid} showSet />
        </MPPaper>
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
            <Grid container spacing={4}>
                <Grid xs><Typography paragraph variant="h4">Problem</Typography></Grid>
                <Grid xs="auto"><MoreVertIcon /></Grid>
            </Grid>
            <Box paddingY={2}>
                <FormControl> <TextField label="Name" value={problem?.title ? problem?.title : ""} onChange={(e) => dispatch(setProblemTitle({probid:probid, title:e.target.value}))} /></FormControl>
            </Box>
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

interface CreateTextStageComponentProps {
    id: number;
}

export function CreateTextStageComponent({ id }: CreateTextStageComponentProps) {
    const stage = useAppSelector(state => state.create.exercise?.stages?.[id]); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();
    if(!stage)
        return <div>Stage not found</div>
    
    if(!(stage.type === "text"))
        return <div>Stage not found</div>

    return (
        <Box paddingY={3} >
            <MPPaper>
            <Typography paragraph variant="h4">Information screen</Typography>
            <CreateTextMarkdownField
                label="Information screen markdown"
                value={stage.text ? stage.text : ""}
                onChange={(e) => dispatch(setTextStageLabel({id:id, text:e}))}
                buttons={["Continue"]}
                />
            </MPPaper>
        </Box>
    )
}

interface CreateTextMarkdownFieldProps {
    label: string;
    value: string;
    onChange: (e:string) => void;
    buttons?: string[];
}

export function CreateTextMarkdownField({ label, value, onChange, buttons }: CreateTextMarkdownFieldProps) {
    return (
        <Grid container spacing={4} xs={12}>
            <Grid xs={12} sm={6}>
                <TextField multiline label={label} value={value} onChange={(e) => {onChange(e.target.value)}} sx={{width: "100%"}} />
            </Grid>
            <Grid xs={12} sm={6}>
                <Paper>
                    <Box padding={3}>
                    <Markdown>{value}</Markdown>
                    {buttons ? buttons.map((label) => <Button disabled>{label}</Button>) : ""}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

interface CreateExerciseButtonsProps {

}

export function CreateExerciseButtons({ }: CreateExerciseButtonsProps) {
    const exercise = useAppSelector(state => state.create.exercise);
    const problems = useAppSelector(state => state.create.problems);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    if(exercise === undefined)
        return <div>Exercise not found</div>

    return (
        <Box paddingY={3}>
            <MPPaper>
            <Button onClick={() => {
                        dispatch(addExercise({ exercise: exercise, problems: problems }));
                        navigate("/exercises/run/");
                }} >Run Exercise</Button>
            <Button onClick={() => {
                        ExportYAML(problems, exercise);
                }} >Download Exercise Spec</Button>
        </MPPaper>
        </Box>
    )
}

interface CreateExerciseComponentProps {
    onCreateExercise: Function
}


export function CreateExerciseComponent({onCreateExercise} : CreateExerciseComponentProps) {
    const stages = useAppSelector(state => state.create.exercise?.stages); // Get the main exercise simply to see if it's there
    const finish = useAppSelector(state => state.create.exercise?.finish); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();
    let seenproblems:string[] = [];

    return (
        <Box>
            <Button onClick={() => onCreateExercise(false)}>Back to create exercise</Button>
            <CreateExerciseInformationComponent />

            {stages ? 
                stages.map((stage, index) => {
                    if(stage.type === "text")
                        return <CreateTextStageComponent key={index} id={index} />
                    else if("probid" in stage) { // This is redundent but it stops typescript from complaining.
                        if(stage?.["probid"] && seenproblems.includes(stage?.["probid"])) {
                            return <CreateProblemRepeatComponent key={index} probid={stage?.probid ? stage.probid : ""} stageindex={index} />
                        }
                        else if(stage?.["probid"] && stage?.["probid"]) {
                            seenproblems.push(stage["probid"])
                            return <CreateProblemComponent stageindex={index} key={index} probid={stage?.probid ? stage.probid : ""} />
                        }
                    }
                    return <div></div>
                }
                )
                : <div></div>
            }

            <Box paddingY={3} >
            <MPPaper>
            <Typography paragraph variant="h4">Add a new section</Typography>
            <Button onClick={() => dispatch(addTextStage(""))}>Add information screen</Button>
            <Button onClick={() => dispatch(addNewProblem(""))}>Add problem</Button>
            </MPPaper>
            </Box>

            <Box paddingY={3} >
            <MPPaper>
            <Typography paragraph variant="h4">Finish message</Typography>
            <CreateTextMarkdownField
                label="Finish message"
                value={finish ? finish.text : ""}
                onChange={(e) => dispatch(setExerciseFinish(e))}
                buttons={["Finish"]}
                />
                </MPPaper>
                </Box>
                <CreateExerciseButtons />
            </Box>
    )
}


export function CreateExerciseInformationComponent() {
    const exercisetitle = useAppSelector(state => state.create?.exercise?.title); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();

    return (
            <div>
                <Box paddingY={2}>
                    <TextField label="Title" value={exercisetitle ? exercisetitle : ""} onChange={(e) => dispatch(setExerciseTitle(e.target.value))} />
                </Box>
            </div>
        )
}


export function CreateComponent() {
    const [creatingExercise, setCreatingExercise] = React.useState<boolean>(false);

    return (
        <div>
            <Typography paragraph variant="h2">Exercise creator</Typography>
            {creatingExercise ? <CreateExerciseComponent onCreateExercise={setCreatingExercise} /> : <CreateNewExerciseComponent onCreateExercise={setCreatingExercise} />}
        </div>
    )
}