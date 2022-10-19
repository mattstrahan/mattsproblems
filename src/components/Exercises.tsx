import { Box, Button, IconButton, List, ListItem,  ListItemText, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { Stage, TextStage } from "../classes/Exercise";
import { Problem } from "../classes/Problem";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ProblemComponent } from './Problems'
import { newExercise, nextProblem } from '../reducers/RepositoryReducer'
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import { exportDOCX } from "./Export";
import { AnswerKey } from "./Answers";
import Grid from "@mui/material/Unstable_Grid2";

interface TextStageProps {
    stage: TextStage;
    answerKey: Partial<AnswerKey>;
}

export function TextStageComponent({stage, answerKey}: TextStageProps) {
    const dispatch = useAppDispatch();
    return (<div>
        {stage.heading && <h1>stage</h1>}
        <ReactMarkdown>{stage.text}</ReactMarkdown>
        <Button onClick={() => dispatch(nextProblem(answerKey))} >Go to the next problem</Button>
    </div>);
}

export function FinishComponent({ stage, answerKey }: TextStageProps) {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    if(answerKey.exerciseSpecId === undefined)
        return <div>Exercise spec ID undefined</div>;
    const exerciseSpecId = answerKey.exerciseSpecId;
    if(typeof exerciseSpecId === "string")
        return (<div>
            {stage.heading && <h1>stage</h1>}
            <p>{stage.text}</p>
            <Button onClick={() => { console.log(answerKey.exerciseSpecId); dispatch(newExercise({exerciseid: exerciseSpecId}));
                        navigate("/exercises/run/");
                            }} >Do this exercise again</Button>
        </div>);
    return <div></div>;
}


interface StageProps {
    stage: Stage;
    key: number;
    answerKey: Partial<AnswerKey>;
}

export function StageComponent({stage, answerKey}: StageProps) {
    if(!stage)
        return (<div></div>);
    
    let component;

    if (stage.type === 'text') {
        component = <TextStageComponent stage={stage as TextStage} answerKey={answerKey} />
    } else if (stage.type === 'problem') {
        component = <ProblemComponent problem={stage as Problem} answerKey={answerKey} />
    } else if (stage.type === 'finish') {
        component = <FinishComponent stage={stage as TextStage} answerKey={answerKey} />
    }

    return (
        <Grid xs={12}>
        <Paper>
            <Box padding={2}>
                {component}
            </Box>
        </Paper>
        </Grid>
    );
}


interface ExerciseMenuProps {
    exerciseId: string;
}

export function ExerciseMenu({ exerciseId }: ExerciseMenuProps) {
    const exercise = useAppSelector(state => state.repository.exercises[exerciseId]); // The current list of exercises

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let navigate = useNavigate();
    
    return (
        <div>
            <IconButton
                aria-label="more"
                id="exercise-title-menu-button"
                aria-controls={open ? 'exercise-title-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="exercise-title-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'exercise-title-menu-button',
                }}
            >
                <MenuItem onClick={() => {navigate("/exercises/export/worksheet/" + exerciseId); handleClose()}}>Export Worksheet</MenuItem>
                <MenuItem onClick={() => {exportDOCX({exercise});handleClose()}}>Export DOCX file</MenuItem>
            </Menu>
        </div>
    )
}

interface ExerciseTitleProps {
    title?: string;
    exerciseId: string;
}

export function ExerciseTitleComponent({ title, exerciseId}: ExerciseTitleProps) {
    return (
        <div>
            <Typography variant="h2">{title}</Typography>
            <ExerciseMenu exerciseId={exerciseId} />
        </div>
    )
}


interface ExerciseInfoProps {
    exerciseId?: string
}

export function ExerciseComponent({ exerciseId }: ExerciseInfoProps) {
    const exercises = useAppSelector(state => state.repository.exercises); // The current list of exercises
    const currentExercise = useAppSelector(state => state.repository.currentExercise); // The current list of exercises

    let params = useParams();

    if(!exerciseId) //It's not in props
        exerciseId = params.exerciseId;

    if (!exerciseId) //It's not in params, so let's use the outlet
        exerciseId = currentExercise;

    if (!(exercises && exercises[exerciseId])) {
        return (<ExerciseList />);
    }

    const exercise = exercises[exerciseId];
    if(exercise.showAllProblems) {
        const listItems = exercise.stages.map((stage, index) => {
            return (
                <StageComponent stage={stage} key={index} answerKey={{ exerciseSpecId: exercise.exerciseSpecId, exercise: exerciseId, stage: index }} />
            );
        });
        return <div>
            <ExerciseTitleComponent title={exercise.title} exerciseId={exerciseId} />
            <Grid container spacing={4}>
                {listItems}
            </Grid>
            </div>
    }

    const currentProblem = exercise.currentProblem;

    return (
        <div>
            <ExerciseTitleComponent title={exercise.title} exerciseId={exerciseId} />
            <StageComponent
                stage={exercise.stages[currentProblem]}
                key={currentProblem}
                answerKey={{ exerciseSpecId: exercise.exerciseSpecId, exercise: exerciseId, stage: currentProblem }} />
        </div>
    );
}

export function ExerciseList() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const ExerciseRepository = useAppSelector(state => state.repository.repository.exercises); // The current list of exercises
    if (!ExerciseRepository)

        return (<div></div>);
    
    return (
        <div>
            <Typography variant="h2">Exercise List</Typography>
            <List>
                {Object.keys(ExerciseRepository).map((key) => (
                    <ListItem
                        button
                        key={key}
                        onClick={() => {
                            dispatch(newExercise({ exerciseid: key }));
                            navigate("/exercises/run/");
                        }}
                    >
                        <ListItemText primary={ExerciseRepository[key].description} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}