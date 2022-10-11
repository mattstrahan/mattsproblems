import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ParameterSpec } from "../classes/Parameters";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { newExercise } from "../reducers/RepositoryReducer";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export interface ExerciseListItemProps {
    exerciseid: string;
    parameters?: { [key: string]: ParameterSpec };
}

export function ExerciseListItem({ exerciseid, parameters }: ExerciseListItemProps) {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const exercise = useAppSelector(state => state.repository.repository.exercises[exerciseid])
    if (!exercise) {
        return (<div></div>);
    }
    return (
        <ListItem
            button
            key={exerciseid}
            onClick={() => {
                dispatch(newExercise({ exerciseid: exerciseid, parameters }));
                navigate("/exercises/run/");
            }}
        >
            <ListItemIcon>
                <ArrowForwardIosIcon />
            </ListItemIcon>
            <ListItemText primary={exercise.description} />
        </ListItem>
    )
}
