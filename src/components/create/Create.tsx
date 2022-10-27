import { Autocomplete, Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewProblem, addProblem, addRepeatProblem, addTextStage, setExerciseFinish, setExerciseTitle,  setTextStageLabel } from "../../reducers/CreateReducer";
import Markdown, { FetchMarkdown } from "../Markdown";
import { addExercise } from "../../reducers/RepositoryReducer";
import { useNavigate } from "react-router-dom";
import MPPaper from "../MPPaper";
import { ExportYAML } from "../export/ExportYAML";
import { CreateNewExerciseComponent } from "./CreateNewExercise";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { CreateProblemComponent, CreateProblemRepeatComponent } from "./CreateProblem";
import { ProblemSpec } from "../../classes/Problem";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import exerciseCreatorInfo from '../../pages/ExerciseCreatorInfo.md';



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
                    {buttons ? buttons.map((label, index) => <Button disabled key={index}>{label}</Button>) : ""}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export function CreateExerciseButtons() {
    const exercise = useAppSelector(state => state.create.exercise);
    const problems = useAppSelector(state => state.create.problems);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    if(exercise === undefined)
        return <div>Exercise not found</div>

    return (
        <Box paddingY={3}>
            <Button onClick={() => {
                        dispatch(addExercise({ exercise: exercise, problems: problems }));
                        navigate("/exercises/run/");
                }} >Run Exercise</Button>
            <Button onClick={() => {
                        ExportYAML(problems, exercise);
                }} >Download Exercise Spec</Button>
        </Box>
    )
}

export function RepeatProblemButton() {
    const problems = useAppSelector(state => state.create.problems);
    const dispatch = useAppDispatch();

    // Used for keeping track of the existing exercise select box
    const [existingproblem, setExistingProblem] = React.useState<[string, Partial<ProblemSpec>] | null | undefined>(null);

    const handleClick = () => {
        if(existingproblem !== undefined && existingproblem !== null) {
            dispatch(addRepeatProblem(existingproblem[0]))
        }
    }


    return (
        <Box paddingY={3}>
            <Typography paragraph variant="h4">Repeat problem</Typography>
            <Grid container spacing={3}>
                <Grid xs="auto">
            <Autocomplete
                id="repeat-problem"
                sx={{ width: 300 }}
                options={Object.entries(problems)}
                getOptionLabel={(option) => option[1].title ? option[1].title : option[0]}
                renderOption={(props, option) => 
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option[1].title ? option[1].title : option[0]}
                    </Box>
                }
                isOptionEqualToValue={(option,value) => option[0] === value[0]}
                renderInput={(params) => <TextField {...params} label="Repeat problem" />}
                value={existingproblem}
                onChange={(event: any, newValue: [string, Partial<ProblemSpec>] | null) => {
                    setExistingProblem(newValue);
                }}
            /></Grid>
            <Grid xs="auto">
            <IconButton onClick={() => handleClick()}>
                <ChevronRightIcon />
            </IconButton>
            </Grid>
            </Grid>
        </Box>
    )
}

export function AddRepositoryProblemButton() {
    const problems = useAppSelector(state => state.repository.repository.problems);
    const dispatch = useAppDispatch();

    // Used for keeping track of the existing exercise select box
    const [existingproblem, setExistingProblem] = React.useState<[string, Partial<ProblemSpec>] | null | undefined>(null);

    const handleClick = () => {
        if(existingproblem !== undefined && existingproblem !== null && existingproblem[1] !== undefined) {
            dispatch(addProblem(existingproblem[1]));
        }
    }


    return (
        <Box paddingY={3}>
            <Typography paragraph variant="h4">Add problem from repository</Typography>
            <Grid container spacing={3}>
                <Grid xs="auto">
            <Autocomplete
                id="add-problem-from-repository"
                sx={{ width: 300 }}
                options={Object.entries(problems)}
                getOptionLabel={(option) => option[1].title ? option[1].title : option[0]}
                renderOption={(props, option) => 
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option[1].title ? option[1].title : option[0]}
                    </Box>
                }
                isOptionEqualToValue={(option,value) => option[0] === value[0]}
                renderInput={(params) => <TextField {...params} label="Add problem" />}
                value={existingproblem}
                onChange={(event: any, newValue: [string, Partial<ProblemSpec>] | null) => {
                    setExistingProblem(newValue);
                }}
            /></Grid>
            <Grid xs="auto">
            <IconButton onClick={() => handleClick()}>
                <ChevronRightIcon />
            </IconButton>
            </Grid>
            </Grid>
        </Box>
    )
}

export function CreateFinishComponent() {
    const finish = useAppSelector(state => state.create.exercise?.finish); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();
    return (
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
    )
}

interface CreateExerciseComponentProps {
    onCreateExercise: Function
}


export function CreateExerciseComponent({onCreateExercise} : CreateExerciseComponentProps) {
    const stages = useAppSelector(state => state.create.exercise?.stages); // Get the main exercise simply to see if it's there
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
                            return <CreateProblemComponent stageindex={index} key={stage?.probid ? stage.probid : index} probid={stage?.probid ? stage.probid : ""} />
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
            <RepeatProblemButton />
            <AddRepositoryProblemButton />
            </MPPaper>
            </Box>

                <CreateFinishComponent />
                <CreateExerciseButtons />
            </Box>
    )
}


export function CreateExerciseInformationComponent() {
    const exercisetitle = useAppSelector(state => state.create?.exercise?.title); // Get the main exercise simply to see if it's there
    const [editTitle, setEditTitle] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (
            <Box paddingY={2}>
                {editTitle
                ? <div><form onSubmit={() => setEditTitle(false)}><TextField autoFocus label="Title" value={exercisetitle ? exercisetitle : ""} onChange={(e) => dispatch(setExerciseTitle(e.target.value))} /> <IconButton onClick={() => setEditTitle(false)}><DoneIcon /></IconButton></form></div>
                : <Typography variant="h3">{exercisetitle} <IconButton onClick={() => setEditTitle(true)}><EditIcon /></IconButton></Typography> 
                }
                <FetchMarkdown>{exerciseCreatorInfo}</FetchMarkdown>
            </Box>
        )
}


export function CreateComponent() {
    const [creatingExercise, setCreatingExercise] = React.useState<boolean>(false);

    return (
        <div>
            {creatingExercise ? <CreateExerciseComponent onCreateExercise={setCreatingExercise} /> : <CreateNewExerciseComponent onCreateExercise={setCreatingExercise} />}
        </div>
    )
}