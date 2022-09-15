import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Course } from "../Classes/Course";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import { createNewExercise } from "../Reducers/RepositoryReducer";


interface CourseComponentProps {
    course: Course
}

export function CourseComponent({ course } : CourseComponentProps) {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const ExerciseRepository = useAppSelector(state => state.repository.repository.exercises); // The current list of exercises
    if (!course)
        return (<div></div>);

    return (
        <Paper>
            <Typography variant="h2">{course.title}</Typography>
            <Typography variant="body2">{course.description}</Typography>
            <List>
                {Object.keys(course.exercises).map((key) => (
                    <ListItem
                        button
                        key={key}
                        onClick={() => {
                            dispatch(createNewExercise({ exerciseid: course.exercises[key].exerciseid, parameters: course.exercises[key].parameters }));
                            navigate("/exercises/run/");
                        }}
                    >
                        <ListItemText primary={ExerciseRepository[course.exercises[key].exerciseid].description} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}


export function CourseList() {
    const courses = useAppSelector(state => state.repository.repository.courses); // The course to list

    return (
        <div>
            <Typography variant="h1">Courses</Typography>
                {Object.keys(courses).map((key) => (
                    <CourseComponent course={courses[key]} />
                ))}
        </div>
    )
}