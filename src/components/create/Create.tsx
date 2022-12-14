import { Autocomplete, Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewProblem, addProblem, addRepeatProblem, addTextStage, setExerciseFinish, setExerciseTitle,  setTextStageText } from "../../reducers/CreateReducer";
import Markdown, { FetchMarkdown } from "../Markdown";
import { addExercise } from "../../reducers/RepositoryReducer";
import { useNavigate } from "react-router-dom";
import MPPaper from "../MPPaper";
import { ExportYAML } from "../export/ExportYAML";
import { CreateNewExerciseComponent } from "./CreateNewExercise";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { CreateProblemComponent, CreateProblemRepeatComponent } from "./CreateProblem";
import { JSGFigureStore, JSGFigureStoreAttributes, ProblemSpec } from "../../classes/Problem";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import exerciseCreatorInfo from '../../pages/ExerciseCreatorInfo.md';
import { defaultenv, envtype, getStrValue } from "../../helpers/env";
import { v4 as uuidv4 } from 'uuid';
import { CreateTextField } from "./CreateTextField";



interface CreateTextStageComponentProps {
    id: number;
    textStageID?: string;
    textStageText: string;
}

export function CreateTextStageComponent({ id, textStageID, textStageText }: CreateTextStageComponentProps) {
    const textStage = useAppSelector(state => state.create.textstages?.[textStageID !== undefined ? textStageID : '']); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();
    
    const text = textStage !== undefined ? textStage : textStageText;

    return (
        <Box paddingY={3} >
            <MPPaper>
            <Typography paragraph variant="h4">Information screen</Typography>
            <CreateTextMarkdownField
                label="Information screen markdown"
                value={text}
                onChange={(e) => dispatch(setTextStageText({id:id, textStageID: textStageID, text:e}))}
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
    const [JSXFigureStore, setJSXFigureStore] = React.useState<{[key:string]:JSGFigureStore}>({});
    // Allow the generation of the jsgFigureStore
    let jsgFigureStore:{[key:string]:JSGFigureStore} = {};
    function setJSXGraphFigure(logic:string, attributes?:JSGFigureStoreAttributes) {
        let prevuuid = "";
        for(let pu in JSXFigureStore) {
            if(JSXFigureStore[pu].logic === logic) {
                prevuuid = pu;
                break;
            }
        }
        const uuid = prevuuid !== "" ? prevuuid : uuidv4();
        jsgFigureStore[uuid] = {logic:logic, attributes:attributes};
        return `![${uuid}](jsxgraph_figurestore)`
    }

    let env:envtype = {...defaultenv};

    env["JSXGraph"] = setJSXGraphFigure;
    const text = getStrValue(value, env)
    
    // Set the new figure store if it's been updated
    for(let bid in jsgFigureStore) {
        if(!JSXFigureStore[bid]) {
            setJSXFigureStore(jsgFigureStore);
            break;
        }
    }

    return (
        <Grid container spacing={4} xs={12}>
            <Grid xs={12} sm={6}>
                <CreateTextField nunjucks multiline label={label} env={env} initial={value} handleChange={(e:string) => {onChange(e)}} sx={{width: "100%"}} />
            </Grid>
            <Grid xs={12} sm={6}>
                <Paper>
                    <Box padding={3}>
                    <Markdown jsgFigureStore={JSXFigureStore}>{text}</Markdown>
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
    const textstages = useAppSelector(state => state.create.textstages);
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
                        ExportYAML(problems, exercise, textstages);
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
                    if(stage.type === "text") {
                        return <CreateTextStageComponent
                            key={stage.textstageid !== undefined ? stage.textstageid : index}
                            textStageID={stage.textstageid}
                            id={index}
                            textStageText={stage.text} />
                    } else if("probid" in stage) { // This is redundent but it stops typescript from complaining.
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