import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { ExerciseSpec } from "../../classes/Exercise";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createNewExercise, createNewExerciseFromExisting } from "../../reducers/CreateReducer";
import MPPaper from "../MPPaper";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Unstable_Grid2";


interface CreateBaseOffExistingExerciseComponentProps {
    onCreateExercise: Function
}

function CreateBaseOffExistingExerciseComponent({ onCreateExercise }: CreateBaseOffExistingExerciseComponentProps) {
    const problems = useAppSelector(state => state.repository.repository.problems); // Get the main exercise simply to see if it's there
    const exercises = useAppSelector(state => state.repository.repository.exercises); // Get the main exercise simply to see if it's there
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if(existingexercise !== undefined && existingexercise !== null) {
            dispatch(createNewExerciseFromExisting({exercise:existingexercise[1], problemrepository:problems}))
            onCreateExercise(true);
        }
    }

    // Used for keeping track of the existing exercise select box
    const [existingexercise, setExistingExercise] = React.useState<[string, Partial<ExerciseSpec>] | null | undefined>(null);

    return (
        <Box paddingY={3}>
            <Typography paragraph variant="h3">Base off an existing exercise</Typography>
            <Grid container spacing={3}>
                <Grid xs="auto">
            <Autocomplete
                id="base-off-existing"
                sx={{ width: 300 }}
                options={Object.entries(exercises)}
                getOptionLabel={(option) => option[1].title ? option[1].title : option[0]}
                renderOption={(props, option) => 
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option[1].title ? option[1].title : option[0]}
                    </Box>
                }
                renderInput={(params) => <TextField {...params} label="Existing exercise" />}
                value={existingexercise}
                onChange={(event: any, newValue: [string, Partial<ExerciseSpec>] | null) => {
                    setExistingExercise(newValue);
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

interface CreateNewExerciseComponentProps {
    onCreateExercise: Function
}

export function CreateNewExerciseComponent({ onCreateExercise }: CreateNewExerciseComponentProps) {
    const dispatch = useAppDispatch();

    return (
        <MPPaper>
                <Typography paragraph variant="h3">Create new exercise</Typography>
                <Button onClick={() => {dispatch(createNewExercise("")); onCreateExercise(true)}}>
                    Create new exercise
                <Icon color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <ChevronRightIcon />
                </Icon>
                </Button>
                <CreateBaseOffExistingExerciseComponent onCreateExercise={onCreateExercise} />
        </MPPaper>
    )
}