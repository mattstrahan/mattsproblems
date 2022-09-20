import { Box, List, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Topic } from "../classes/Topics";
import { useAppSelector } from "../hooks/hooks";
import { ExerciseListItem } from "./ExerciseList";

interface TopicExerciseListProps {
    topic: Topic
}

export function TopicExerciseList({ topic }: TopicExerciseListProps) {
    return (
        <List>
            {topic.exerciseids.map((exerciseid: string, key) => (
                <ExerciseListItem exerciseid={exerciseid} />
            ))}
        </List>
    )
}

interface TopicComponentProps {
    topic: Topic
}

export function TopicComponent({ topic }: TopicComponentProps) {
    return (
        <Paper>
            <Box padding={3}>
                <Typography paragraph variant="h3">{topic.title}</Typography>
                <Typography paragraph variant="subtitle1">{topic.description}</Typography>
                <TopicExerciseList topic={topic} />
            </Box>
        </Paper>
    )
}


export function TopicList() {
    const topics = useAppSelector(state => state.repository.repository.topics); // The topics to list

    return (
        <Grid container spacing={4}>
            <Grid xs={12}>
                <Typography variant="h2">Topics</Typography>
            </Grid>
            {Object.keys(topics).map((key) => (
                <Grid xs={12}>
                <TopicComponent topic={topics[key]} />
                </Grid>
            ))}
        </Grid>
    )
}