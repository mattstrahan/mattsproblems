import { Box, List, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Course, CourseExerciseSpec } from "../classes/Course";
import { useAppSelector } from "../hooks/hooks";
import { ExerciseListItem } from "./ExerciseList";

interface CourseExerciseListProps {
    exercises: CourseExerciseSpec[]
}

export function CourseExerciseList({ exercises }: CourseExerciseListProps) {
    return (
        <List>
            {exercises.map((exercise, key) => (
                <ExerciseListItem exerciseid={exercise.exerciseid} parameters={exercise.parameters} />
            ))}
        </List>
    )
}

interface CourseComponentProps {
    course: Course
}

export function CourseComponent({ course } : CourseComponentProps) {
    if (!course)
        return (<div></div>);

    return (
        <Paper>
            <Box padding={3}>
                <Typography paragraph variant="h3">{course.title}</Typography>
                <Typography paragraph variant="subtitle1">{course.description}</Typography>
                { course.topics !== undefined 
                ? Object.keys(course.topics).map((key, index) => 
                    <Box>
                        <Typography paragraph variant="h4">{key}</Typography>
                        {course?.topics?.[key] ? <CourseExerciseList exercises={course.topics[key]} /> : (null)}
                    </Box>
                    )
                : (null)
                }
                {course.exercises !== undefined
                ? <CourseExerciseList exercises={course.exercises} />
                : (null)}
            </Box>
        </Paper>
    )
}


export function CourseList() {
    const courses = useAppSelector(state => state.repository.repository.courses); // The course to list

    return (
        <Grid container spacing={4}>
            <Grid xs={12}>
                <Typography variant="h2">Courses</Typography>
            </Grid>
            {Object.keys(courses).map((key) => (
                <Grid xs={12}>
                <CourseComponent course={courses[key]} />
                </Grid>
            ))}
        </Grid>
    )
}